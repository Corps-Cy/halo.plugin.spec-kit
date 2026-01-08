#!/usr/bin/env node

const { colors } = require('./src/core/ui');

// Import Commands
const cmdInit = require('./src/commands/init');
const cmdNew = require('./src/commands/new');
const cmdContext = require('./src/commands/context');
const cmdApply = require('./src/commands/apply');
const cmdCode = require('./src/commands/code');
const cmdStart = require('./src/commands/start');

// --- Main Dispatcher (Native) ---
const args = process.argv.slice(2);
const command = args[0];

(async () => {
    try {
        if (command === 'init') {
            await cmdInit(args.slice(1));
        } else if (command === 'new') {
            await cmdNew();
        } else if (command === 'start') {
            await cmdStart(args.slice(1));
        } else if (command === 'context') {
            await cmdContext(args[1]);
        } else if (command === 'apply') {
            await cmdApply(args[1]);
        } else if (command === 'code') {
            await cmdCode(args[1]);
        } else {
            console.log(`${colors.bright}Usage:${colors.reset}`);
            console.log("  hps init [name]      Initialize HPS (optionally create new project)");
            console.log("  hps start [tool]     Launch AI tool with context loaded (Gemini/Cursor)");
            console.log("  hps new              Start a new feature proposal");
            console.log("  hps context <name>   Assemble context for a feature");
            console.log("  hps apply <name>     Merge feature specifications into truth");
            console.log("  hps code <name>      Generate coding instructions for AI");
        }
    } catch (err) {
        console.error(`${colors.red}Fatal Error:${colors.reset}`, err);
        process.exit(1);
    }
})();
