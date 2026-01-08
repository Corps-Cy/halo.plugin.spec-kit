const fs = require('fs');
const path = require('path');
const { TaskRunner, selectOption, colors } = require('../core/ui');
const { getHaloContext, generateContextContent, HPS_DIR } = require('../core/utils');
const templates = require('../data/templates');
const { t, setLang, getLang } = require('../data/locales');

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
    });

    // --- Step 4: AI Configuration ---
    runner.addTask(() => t('config_ai'), async () => {
        const options = [
            { label: "Gemini (Google)", value: "gemini", description: t('opt_gemini') },
            { label: "Cursor IDE", value: "cursor", description: t('opt_cursor') },
            { label: "GitHub Copilot", value: "copilot", description: t('opt_copilot') },
            { label: "Ollama / Local LLM", value: "ollama", description: t('opt_ollama') },
            { label: "General", value: "general", description: t('opt_general') }
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
            // Combine context with Cursor Rules
            const rules = templates.cursorRules(getLang()) + "\n\n" + fullContext;
            write('.cursorrules', rules);
        } else {
            // Generate HPS.md for general AI CLI integration
            const hpsContext = templates.hpsMd(projectName || 'halo-plugin');
            write('HPS.md', hpsContext);

            // Create a convenience script to start Gemini with context
            const startScript = `#!/bin/bash
# Check if gemini is installed
if ! command -v gemini &> /dev/null; then
    echo "❌ 'gemini' command not found. Please install the CLI from geminicli.com"
    exit 1
fi

echo "🚀 Starting Gemini with HPS Context..."
echo "ℹ️  Tip: Type '/hps' to see available commands (if supported) or just ask the AI."

# Try to pass the context as the first argument (standard pattern)
# If your CLI uses a different flag (like -s or --system), please edit this line.
gemini "$(cat HPS.md)"
`;
            write('start_ai.sh', startScript);
            try { fs.chmodSync(path.join(targetDir, 'start_ai.sh'), '755'); } catch(e){}

            // Combine context with System Prompt for those that need it
            const prompt = templates.systemPrompt(getLang()) + "\n\n" + fullContext;
            
            if (selectedTool === 'ollama') {
                write(path.join(HPS_DIR, 'Modelfile'), `FROM llama3\nSYSTEM """\n${prompt}\n"""`);
            } else if (selectedTool === 'copilot') {
                write('.github/copilot-instructions.md', prompt);
            } else {
                // Gemini or General
                write(path.join(HPS_DIR, 'prompts/SYSTEM_INSTRUCTION.md'), prompt);
            }
        }
    });

    // --- Step 6: Future Initialization Steps (Placeholder) ---
    /* 
       TODO: Add additional initialization steps here.
       Example:
       runner.addTask("Setup Git Hooks", async () => { ... });
    */
    
    await runner.run();
    
    if (projectName) {
        console.log(`
${colors.green}${t('project_ready')} cd ${projectName}${colors.reset}`);
    }
}

module.exports = cmdInit;