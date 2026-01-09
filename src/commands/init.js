const fs = require('fs');
const path = require('path');
const { TaskRunner, selectOption, colors, log, BACK_SIGNAL } = require('../core/ui/index');
const { getHaloContext, generateContextContent, HPS_DIR } = require('../core/utils');
const templates = require('../data/templates');
const { t, setLang, getLang } = require('../data/locales');
const cmdStart = require('./start');

async function cmdInit(args) {
    const runner = new TaskRunner();
    const projectName = args[0]; 
    let targetDir = process.cwd();
    let selectedTool = 'general';
    let pendingLaunch = null; 

    // --- Step 1: Language ---
    runner.addTask(() => t('select_lang'), async () => {
        const langOptions = [
            { label: "中文 (Chinese)", value: "zh", description: "使用中文界面和提示词" },
            { label: "English", value: "en", description: "Use English interface and prompts" },
            { label: "日本語 (Japanese)", value: "ja", description: "日本語インターフェースとプロンプトを使用" }
        ];
        const result = await selectOption(t('select_lang'), langOptions);
        if (result === BACK_SIGNAL) return BACK_SIGNAL;
        
        setLang(result);
    });

    // --- Hidden Tasks ---
    if (projectName) {
        targetDir = path.join(process.cwd(), projectName);
        runner.addTask(() => t('creating_project'), async () => {
            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });
            }
            
            const dirs = [
                path.join('src/main/java/run/halo/plugin/', projectName.replace(/-/g, '')),
                'src/main/resources',
                'ui/src'
            ];
            dirs.forEach(d => fs.mkdirSync(path.join(targetDir, d), { recursive: true }));

            fs.writeFileSync(path.join(targetDir, 'build.gradle.kts'), templates.gradle(projectName));
            fs.writeFileSync(path.join(targetDir, 'src/main/resources/plugin.yaml'), templates.pluginYaml(projectName));
            const javaPath = path.join(targetDir, `src/main/java/run/halo/plugin/${projectName.replace(/-/g, '')}/StarterPlugin.java`);
            fs.writeFileSync(javaPath, templates.javaClass(projectName));
        }, true);
    }

    runner.addTask(() => t('init_kb'), async () => {
        const hpsDir = path.join(targetDir, HPS_DIR);
        [
            path.join(hpsDir, 'current_state'),
            path.join(hpsDir, 'changes'),
            path.join(hpsDir, 'prompts')
        ].forEach(d => fs.mkdirSync(d, { recursive: true }));
        
        fs.writeFileSync(path.join(hpsDir, 'project.md'), templates.hpsProjectSpec(projectName || 'MyPlugin'));
    }, true);

    // --- Step 2: AI Config ---
    runner.addTask(() => t('config_ai'), async () => {
        const options = [
            { label: "Gemini (Google)", value: "gemini", description: t('opt_gemini') },
            { label: "Cursor IDE", value: "cursor", description: t('opt_cursor') },
            { label: "Claude Code", value: "claude", description: t('opt_claude') },
            { label: "GitHub Copilot", value: "copilot", description: t('opt_copilot') },
            { label: "Ollama / Local LLM", value: "ollama", description: t('opt_ollama') },
            { label: "General", value: "general", description: t('opt_general') }
        ];

        const result = await selectOption(t('select_ai'), options);
        if (result === BACK_SIGNAL) return BACK_SIGNAL;

        selectedTool = result;
        const config = { ai_tool: selectedTool, language: getLang(), project_name: projectName || 'existing' };
        fs.writeFileSync(path.join(targetDir, HPS_DIR, 'config.json'), JSON.stringify(config, null, 2));
    });

    runner.addTask(() => t('gen_files'), async () => {
        const contextData = getHaloContext(); 
        const fullContext = generateContextContent(contextData); 
        
        const write = (p, c) => {
            const dest = path.join(targetDir, p);
            const parent = path.dirname(dest);
            if (!fs.existsSync(parent)) fs.mkdirSync(parent, { recursive: true });
            fs.writeFileSync(dest, c);
        };

        if (selectedTool === 'cursor') {
            const rules = templates.cursorRules(getLang()) + "\n\n" + fullContext;
            write('.cursorrules', rules);
        } else {
            const hpsContext = templates.hpsMd(projectName || 'halo-plugin');
            write('HPS.md', hpsContext + "\n\n" + fullContext);
            const prompt = templates.systemPrompt(getLang()) + "\n\n" + fullContext;
            write(path.join(HPS_DIR, 'prompts/SYSTEM_INSTRUCTION.md'), prompt);
            
            if (selectedTool === 'ollama') {
                const modelfile = 'FROM llama3\nSYSTEM """\n' + prompt + '\n"""';
                write(path.join(HPS_DIR, 'Modelfile'), modelfile);
            } else if (selectedTool === 'copilot') {
                write('.github/copilot-instructions.md', prompt);
            }
        }
    }, true);

    // --- Step 3: Launch ---
    runner.addTask(() => t('launching_ai_task'), async () => {
        if (selectedTool === 'general') return;

        const launchPrompt = t('launch_prompt').replace('{tool}', selectedTool);
        
        const result = await selectOption(launchPrompt, [
            { label: t('launch_yes'), value: "yes", description: t('launch_yes_desc') },
            { label: t('launch_no'), value: "no", description: t('launch_no_desc') }
        ]);
        if (result === BACK_SIGNAL) return BACK_SIGNAL;

        if (result === 'yes') {
            const msg = t('switching_context').replace('{dir}', targetDir);
            console.log(`\n${colors.cyan}${msg}${colors.reset}\n`);
            process.chdir(targetDir);
            pendingLaunch = selectedTool;
        }
    });

    await runner.run();
    
    if (pendingLaunch) {
        await cmdStart([pendingLaunch]);
    } else if (projectName) {
        console.log(`${colors.green}${t('project_ready')} cd ${projectName}${colors.reset}`);
    }
}

module.exports = cmdInit;