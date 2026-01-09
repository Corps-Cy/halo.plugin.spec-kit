const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { colors, log } = require('../core/ui');
const { loadHpsConfig } = require('../core/utils');

async function cmdStart(args) {
    const config = loadHpsConfig();
    const tool = (args && args[0]) || config.ai_tool || 'gemini';

    // 1. Check if tool is supported
    // For now we mainly support 'gemini' CLI as it accepts prompt via args nicely
    if (tool !== 'gemini' && tool !== 'ollama') {
        log.info(`Tool '${tool}' usually runs as a standalone app or plugin.`);
        console.log(`Please open your AI tool manually and ensure it reads the context from 'HPS.md' or '.hps/prompts/SYSTEM_INSTRUCTION.md'.`);
        return;
    }

    // 2. Prepare Context
    const contextPath = path.join(process.cwd(), 'HPS.md');
    if (!fs.existsSync(contextPath)) {
        log.error("HPS.md not found. Did you run 'hps init'?");
        return;
    }

    let contextContent = fs.readFileSync(contextPath, 'utf8');

    // 3. Launch Tool
    console.log(`${colors.cyan}🚀 Launching ${tool} with HPS Context...${colors.reset}`);
    console.log(`${colors.dim}(Context size: ${contextContent.length} chars)${colors.reset}\n`);

    let cmd = tool;
    let cmdArgs = [];

    if (tool === 'gemini') {
        // Gemini CLI: gemini "system prompt"
        // Note: Depending on the specific 'gemini' CLI implementation installed by user,
        // the way to pass system prompt might vary. Assuming standard args[0] is prompt.
        cmdArgs = [contextContent];
    } else if (tool === 'ollama') {
        // Ollama: ollama run llama3 "prompt"
        // Or run interactive. Ollama is tricky to inject system prompt via CLI arg for interactive session.
        // We assume user has created a Modelfile via 'hps init' and we just run that model.
        // But 'hps init' just writes the file. User needs to 'ollama create'.
        // Let's keep it simple: Just run 'ollama run llama3' and paste context?
        // Or tell user to run 'ollama run hps-agent' if they built it.
        log.info("For Ollama, please ensure you have built the model using 'ollama create hps -f .hps/Modelfile'");
        cmd = 'ollama';
        cmdArgs = ['run', 'hps'];
    }

    // Cross-platform spawn
    const isWin = process.platform === 'win32';
    
    const child = spawn(cmd, cmdArgs, {
        stdio: 'inherit', // Connect stdin/stdout directly to parent terminal
        shell: isWin // Use shell on Windows to resolve commands
    });

    child.on('error', (err) => {
        log.error(`Failed to start ${tool}: ${err.message}`);
        if (err.code === 'ENOENT') {
            console.log(`${colors.yellow}Tip: Is '${tool}' installed and in your PATH?${colors.reset}`);
        }
    });

    child.on('close', (code) => {
        if (code !== 0) {
            console.log(`${colors.dim}${tool} exited with code ${code}${colors.reset}`);
        }
    });
}

module.exports = cmdStart;