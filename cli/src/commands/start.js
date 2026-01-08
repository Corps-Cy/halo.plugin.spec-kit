const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { colors, log, selectOption } = require('../core/ui');
const { HPS_DIR, getHaloContext, generateContextContent, readFileSafe, loadHpsConfig } = require('../core/utils');
const templates = require('../data/templates');

async function cmdStart(args) {
    const config = loadHpsConfig();

    // 1. Determine AI Tool
    let aiTool = args[0] || config.ai_tool;
    if (!aiTool || aiTool === 'general') {
        aiTool = await selectOption("Select AI Tool to launch:", [
            { label: "Google Gemini CLI", value: "gemini", description: "Requires 'gemini' in PATH" },
            { label: "Claude Code", value: "claude", description: "Requires 'claude' in PATH" },
            { label: "Cursor", value: "cursor", description: "Opens project in Cursor" }
        ]);
    }

    // 2. Prepare Context (The "Brain")
    log.step("Assembling Project Context...");
    
    // Ensure HPS.md exists (The "Instructions")
    if (!fs.existsSync('HPS.md')) {
        const projectName = config.project_name || path.basename(process.cwd());
        fs.writeFileSync('HPS.md', templates.hpsMd(projectName));
    }
    const hpsInstructions = readFileSafe('HPS.md');

    // Get Technical Specs (The "Knowledge")
    const contextData = getHaloContext(); 
    const technicalContext = generateContextContent(contextData); 
    
    // Combine them
    const fullPrompt = `${hpsInstructions}\n\n${technicalContext}`;

    // 3. Launch Tool
    console.log(`${colors.bright}🚀 Launching ${aiTool}...${colors.reset}`);

    if (aiTool === 'cursor') {
        // For Cursor, we just ensure .cursorrules is up to date and open it
        const cursorRules = templates.cursorRules('zh') + "\n\n" + technicalContext; // Defaulting to zh/en based on config usually
        fs.writeFileSync('.cursorrules', cursorRules);
        spawn('cursor', ['.'], { stdio: 'inherit', shell: true });
        log.success("Opened in Cursor. The AI is ready!");
    } 
    if (aiTool === 'gemini') {
        // Save the massive context to a temporary file
        const tempContextPath = path.join(HPS_DIR, 'bootstrap_context.md');
        fs.writeFileSync(tempContextPath, fullPrompt);

        log.info("Starting Gemini session...");
        
        // Strategy: Use 'cat' to feed the context file + standard input (keyboard) into gemini.
        // This ensures the initial prompt is sent, but the pipe remains open for user input.
        // Command: cat .hps/bootstrap_context.md - | gemini
        
        const shellCmd = `cat "${tempContextPath}" - | gemini`;
        
        const child = spawn(shellCmd, [], { 
            stdio: 'inherit', // Let the shell handle stdin/stdout directly
            shell: true,
            env: { ...process.env, PYTHONUNBUFFERED: '1' } // Force unbuffered output if it's Python
        });
        
        child.on('exit', (code) => {
            console.log(colors.reset); // Reset colors on exit
            if (code !== 0) log.info("Gemini exited.");
        });
    }
    else if (aiTool === 'claude') {
        // Claude Code usually handles context via creating a file or project init.
        // But for "launching", we can try passing the prompt.
        log.info("For Claude Code, ensure you have run 'claude init'. We updated HPS.md for it.");
        spawn('claude', [], { stdio: 'inherit', shell: true });
    }
    else {
        log.error(`Unknown tool: ${aiTool}`);
    }
}

module.exports = cmdStart;
