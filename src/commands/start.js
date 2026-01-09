const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { colors, log, selectOption } = require('../core/ui/index');
const { HPS_DIR, getHaloContext, generateContextContent, readFileSafe, loadHpsConfig, copyToClipboard } = require('../core/utils');
const templates = require('../data/templates');
const { t } = require('../data/locales');

async function cmdStart(args) {
    const config = loadHpsConfig();

    let aiTool = (args && args[0]) || config.ai_tool;
    if (!aiTool || aiTool === 'general') {
        aiTool = await selectOption(t('select_ai'), [
            { label: "Google Gemini CLI", value: "gemini", description: "Requires 'gemini' in PATH" },
            { label: "Claude Code", value: "claude", description: "Requires 'claude' in PATH" },
            { label: "Cursor", value: "cursor", description: "Opens project in Cursor" }
        ]);
    }

    if (!fs.existsSync('HPS.md')) {
        const projectName = config.project_name || path.basename(process.cwd());
        fs.writeFileSync('HPS.md', templates.hpsMd(projectName));
    }
    const hpsInstructions = readFileSafe('HPS.md');
    const contextData = getHaloContext(); 
    const technicalContext = generateContextContent(contextData); 
    const fullPrompt = `${hpsInstructions}\n\n${technicalContext}`;

    console.log(`${colors.bright}${t('launching_ai')}: ${aiTool}...${colors.reset}`);

    if (aiTool === 'cursor') {
        const lang = config.language || 'en';
        const cursorRules = templates.cursorRules(lang) + "\n\n" + technicalContext; 
        fs.writeFileSync('.cursorrules', cursorRules);
        spawn('cursor', ['.'], { stdio: 'inherit', shell: true });
    } 
    else if (aiTool === 'gemini') {
        // Fallback to Clipboard strategy for maximum stability
        const tempContextPath = path.join(HPS_DIR, 'bootstrap_context.md');
        fs.writeFileSync(tempContextPath, fullPrompt);

        if (copyToClipboard(fullPrompt)) {
            console.log(`\n${colors.green}✔ ${t('cmd_copied')}${colors.reset}`);
            console.log(`${colors.yellow}Please run 'gemini' manually and paste (Cmd+V) the context.${colors.reset}\n`);
        } else {
            console.log(`\n${colors.yellow}${t('manual_launch_tip')}${colors.reset}`);
            console.log(`\n    cat "${tempContextPath}" | gemini\n`);
        }
        // Exit to let user take over terminal
        process.exit(0);
    }
    else if (aiTool === 'claude') {
        const tempContextPath = path.join(HPS_DIR, 'claude_context.md');
        fs.writeFileSync(tempContextPath, fullPrompt);
        console.log(`${colors.yellow}${t('claude_tip')}${colors.reset}`);
        spawn('claude', [], { stdio: 'inherit', shell: true });
    }
    else {
        log.error(`Unknown tool: ${aiTool}`);
    }
}

module.exports = cmdStart;