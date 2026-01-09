const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { colors, log, selectOption } = require('../core/ui');
const { HPS_DIR, getHaloContext, generateContextContent, readFileSafe, loadHpsConfig, copyToClipboard } = require('../core/utils');
const templates = require('../data/templates');
const { t } = require('../data/locales');

async function cmdStart(args) {
    const config = loadHpsConfig();

    // 1. Determine AI Tool
    let aiTool = (args && args[0]) || config.ai_tool;
    if (!aiTool || aiTool === 'general') {
        aiTool = await selectOption(t('select_ai'), [
            { label: "Google Gemini CLI", value: "gemini", description: "Requires 'gemini' in PATH" },
            { label: "Claude Code", value: "claude", description: "Requires 'claude' in PATH" },
            { label: "Cursor", value: "cursor", description: "Opens project in Cursor" }
        ]);
    }

    // 2. Prepare Context
    if (!fs.existsSync('HPS.md')) {
        const projectName = config.project_name || path.basename(process.cwd());
        fs.writeFileSync('HPS.md', templates.hpsMd(projectName));
    }
    const hpsInstructions = readFileSafe('HPS.md');
    const contextData = getHaloContext(); 
    const technicalContext = generateContextContent(contextData); 
    const fullPrompt = `${hpsInstructions}\n\n${technicalContext}`;

    // 3. Launch Tool
    console.log(`${colors.bright}${t('launching_ai')}: ${aiTool}...${colors.reset}`);

    if (aiTool === 'cursor') {
        const lang = config.language || 'en';
        const cursorRules = templates.cursorRules(lang) + "\n\n" + technicalContext; 
        fs.writeFileSync('.cursorrules', cursorRules);
        spawn('cursor', ['.'], { stdio: 'inherit', shell: true });
    } 
    else if (aiTool === 'gemini') {
        // --- NEW ROBUST STRATEGY FOR GEMINI ---
        // We avoid shell pipes like 'cat | gemini' which are brittle.
        // Instead, we spawn gemini and manually write to its stdin.
        
        console.log(`${colors.cyan}ℹ Injecting context into Gemini session...${colors.reset}`);

        const child = spawn('gemini', [], {
            stdio: ['pipe', 'inherit', 'inherit'], // Pipe STDIN, inherit STDOUT/STDERR
            shell: true
        });

        // Write context
        child.stdin.write(fullPrompt + '\n');
        
        // CRITICAL: Connect our terminal's stdin to Gemini's stdin
        // so you can keep typing.
        process.stdin.pipe(child.stdin);

        child.on('exit', (code) => {
            process.exit(code);
        });
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