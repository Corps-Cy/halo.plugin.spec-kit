const fs = require('fs');
const path = require('path');
const { TaskRunner, selectOption, colors, log } = require('../core/ui');
const { getHaloContext, generateContextContent, HPS_DIR } = require('../core/utils');
const templates = require('../data/templates');
const { t, setLang, getLang } = require('../data/locales');
const cmdStart = require('./start');

async function cmdInit(args) {
    const runner = new TaskRunner();
    const projectName = args[0]; 
    let targetDir = process.cwd();
    let selectedTool = 'general';

    // --- Step 1: Language Selection ---
    runner.addTask("Language Setup / 语言设置", async () => {
        const langOptions = [
            { label: "中文 (Chinese)", value: "zh", description: "使用中文界面和提示词" },
            { label: "English", value: "en", description: "Use English interface and prompts" }
        ];
        const selectedLang = await selectOption("Please select language / 请选择语言:", langOptions);
        setLang(selectedLang);
    });

    // --- Step 2: Project Structure (if name provided) ---
    if (projectName) {
        targetDir = path.join(process.cwd(), projectName);
        runner.addTask(() => `${t('creating_project')}: ${projectName}`, async () => {
            if (fs.existsSync(targetDir)) throw new Error(`Directory ${projectName} already exists`);
            fs.mkdirSync(targetDir, { recursive: true });
            
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
        });
    }

    // --- Step 3: HPS Knowledge Base Init ---
    runner.addTask(() => t('init_kb'), async () => {
        const hpsDir = path.join(targetDir, HPS_DIR);
        [
            path.join(hpsDir, 'current_state'),
            path.join(hpsDir, 'changes'),
            path.join(hpsDir, 'prompts')
        ].forEach(d => fs.mkdirSync(d, { recursive: true }));
        
        // Generate Project Spec
        fs.writeFileSync(path.join(hpsDir, 'project.md'), templates.hpsProjectSpec(projectName || 'MyPlugin'));
    });

    // --- Step 4: AI Configuration ---
    runner.addTask(() => t('config_ai'), async () => {
        const options = [
            { label: "Gemini (Google)", value: "gemini", description: t('opt_gemini') },
            { label: "Cursor IDE", value: "cursor", description: t('opt_cursor') },
            { label: "Claude Code", value: "claude", description: "Launch with Claude CLI" },
            { label: "General (Skip)", value: "general", description: t('opt_general') }
        ];

        selectedTool = await selectOption(t('select_ai'), options);
        
        const config = { ai_tool: selectedTool, language: getLang(), project_name: projectName || 'existing' };
        fs.writeFileSync(path.join(targetDir, HPS_DIR, 'config.json'), JSON.stringify(config, null, 2));
    });

    // --- Step 5: Generate Context Files ---
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
            // General / Gemini / Claude
            const hpsContext = templates.hpsMd(projectName || 'halo-plugin');
            write('HPS.md', hpsContext + "\n\n" + fullContext);
            const prompt = templates.systemPrompt(getLang()) + "\n\n" + fullContext;
            write(path.join(HPS_DIR, 'prompts/SYSTEM_INSTRUCTION.md'), prompt);
        }
    });

    await runner.run();
    
    // --- Step 6: Seamless Launch (New Feature) ---
    if (selectedTool !== 'general') {
        const shouldLaunch = await selectOption(`
✨ Setup Complete! Launch ${selectedTool} environment now?`, [
            { label: "Yes, launch it! 🚀", value: "yes", description: "Start developing immediately" },
            { label: "No, later", value: "no", description: "I will run 'hps start' later" }
        ]);

        if (shouldLaunch === 'yes') {
            console.log(`
${colors.cyan}Switching context to ${targetDir}...${colors.reset}`);
            try {
                process.chdir(targetDir);
                await cmdStart([selectedTool]); // Invoke start logic directly
            } catch (err) {
                log.error(`Failed to launch: ${err.message}`);
            }
            return; // Exit after launch
        }
    }

    if (projectName) {
        console.log(`
${colors.green}${t('project_ready')} cd ${projectName}${colors.reset}`);
        console.log(`${colors.dim}Run 'hps start' to begin whenever you are ready.${colors.reset}`);
    }
}

module.exports = cmdInit;