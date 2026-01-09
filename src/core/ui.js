const readline = require('readline');
const { t } = require('../data/locales');

const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    green: "\x1b[32m",
    cyan: "\x1b[36m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    red: "\x1b[31m",
    magenta: "\x1b[35m"
};

const log = {
    step: (msg) => console.log(`${colors.blue}==>${colors.reset} ${colors.bright}${msg}${colors.reset}`),
    success: (msg) => console.log(`${colors.green}✔ ${msg}${colors.reset}`),
    info: (msg) => console.log(`${colors.cyan}ℹ ${msg}${colors.reset}`),
    error: (msg) => console.log(`${colors.red}✖ ${msg}${colors.reset}`)
};

class TaskRunner {
    constructor() {
        this.tasks = [];
    }

    // New: added 'hidden' parameter
    addTask(nameFn, fn, hidden = false) {
        this.tasks.push({ nameFn, fn, hidden });
    }

    async run() {
        // Only count non-hidden tasks for the total
        const visibleTasks = this.tasks.filter(t => !t.hidden);
        const totalSteps = visibleTasks.length;
        let currentVisibleStep = 0;

        console.log(`\n${colors.bright}${colors.blue}${t('start_workflow') || "🚀 Starting Workflow..."}${colors.reset}\n`);

        const renderBar = (visibleStep, taskName) => {
            const barLength = 20;
            // Progress based on actual task index / total tasks
            const totalTasks = this.tasks.length;
            // But display Step X/Y based on manual steps
            const filled = Math.round((visibleStep / totalSteps) * barLength);
            const bar = '█'.repeat(Math.min(filled, 20)) + '░'.repeat(Math.max(0, 20 - filled));
            
            let safeName = taskName;
            if (safeName.length > 40) safeName = safeName.substring(0, 37) + "...";

            readline.clearLine(process.stdout, 0);
            readline.cursorTo(process.stdout, 0);
            
            const stepInfo = visibleStep > 0 ? `Step ${visibleStep}/${totalSteps}:` : `Preparing:`
            process.stdout.write(`${colors.cyan}[${bar}] ${stepInfo}${colors.reset} ${colors.bright}${safeName}${colors.reset}`);
        };

        for (let i = 0; i < this.tasks.length; i++) {
            const task = this.tasks[i];
            const taskName = typeof task.nameFn === 'function' ? task.nameFn() : task.nameFn;
            
            if (!task.hidden) currentVisibleStep++;
            
            renderBar(currentVisibleStep, taskName);
            
            const isInteractive = taskName && (taskName.includes("Select") || taskName.includes("选择") || taskName.includes("言語") || taskName.includes("AI") || taskName.includes("启动") || taskName.includes("Launch"));

            try {
                if (isInteractive) {
                     readline.clearLine(process.stdout, 0);
                     readline.cursorTo(process.stdout, 0);
                     await task.fn();
                } else {
                    await task.fn();
                    await new Promise(r => setTimeout(r, 400));
                }
            } catch (e) {
                process.stdout.write(`\n${colors.red}✖ ${t('task_failed')}: ${e.message}${colors.reset}\n`);
                process.exit(1);
            }
        }
        
        const fullBar = '█'.repeat(20);
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${colors.cyan}[${fullBar}] ${t('init_complete')}${colors.reset}\n\n`);
    }
}

function selectOption(question, options) {
    if (!options || !Array.isArray(options)) process.exit(1);

    return new Promise((resolve) => {
        let selectedIndex = 0;
        const { stdin, stdout } = process;

        const cursorHide = '\x1b[?25l';
        const cursorShow = '\x1b[?25h';
        const clearLine = '\x1b[2K';
        const cursorUp = (n) => `\x1b[${n}A`;
        const cursorLeft = '\r';
        
        const palette = {
            reset: "\x1b[0m",
            bold: "\x1b[1m",
            dim: "\x1b[2m",
            white: "\x1b[37m",
            cyan: "\x1b[36m",
            magenta: "\x1b[35m",
            green: "\x1b[32m",
            yellow: "\x1b[33m"
        };
        
        options.forEach(opt => opt.descColor = palette.cyan);
        
        let firstRender = true;

        function render() {
            if (!firstRender) stdout.write(cursorUp(options.length));
            firstRender = false;
            options.forEach((opt, i) => {
                const isSelected = i === selectedIndex;
                stdout.write(clearLine + cursorLeft); 
                if (isSelected) {
                    stdout.write(`   ${palette.cyan}『${palette.reset} ${palette.white}${palette.bold}${opt.label}${palette.reset} ${palette.cyan}』${palette.reset}   ${opt.descColor}✨ ${opt.description}${palette.reset}\n`);
                } else {
                    stdout.write(`     ${palette.dim}${opt.label}       ${opt.description}${palette.reset}\n`);
                }
            });
        }

        stdout.write(cursorHide);
        console.log(`${colors.bright}${question}${colors.reset}`);
        render();

        if (stdin.isTTY) {
            stdin.setRawMode(true);
            stdin.resume();
            stdin.setEncoding('utf8');
        }

        function cleanup() {
            stdout.write(cursorShow);
            if (stdin.isTTY) stdin.setRawMode(false);
            stdin.pause();
            stdin.removeListener('data', handleKey);
        }

        function handleKey(key) {
            if (key === '\u0003') { cleanup(); process.exit(); }
            if (key === '\u001b[A') { selectedIndex = (selectedIndex - 1 + options.length) % options.length; render(); }
            else if (key === '\u001b[B') { selectedIndex = (selectedIndex + 1) % options.length; render(); }
            else if (key === '\r') { cleanup(); resolve(options[selectedIndex].value); }
        }
        stdin.on('data', handleKey);
    });
}

module.exports = { colors, log, TaskRunner, selectOption };