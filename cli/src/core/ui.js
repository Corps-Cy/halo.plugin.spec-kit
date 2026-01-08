const readline = require('readline');
const { t } = require('../data/locales');

const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
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

    addTask(name, fn) {
        this.tasks.push({ name, fn });
    }

    async run() {
        const total = this.tasks.length;
        console.log(`\n${colors.bright}${colors.blue}🚀 Starting Workflow...${colors.reset}\n`);

        const renderBar = (step, taskName) => {
            const barLength = 20;
            const filled = Math.round((step / total) * barLength);
            const bar = '█'.repeat(filled) + '░'.repeat(barLength - filled);
            process.stdout.write(`\r\x1b[K${colors.cyan}[${bar}] Step ${step}/${total}:${colors.reset} ${colors.bright}${taskName}${colors.reset}`);
        };

        for (let i = 0; i < total; i++) {
            const task = this.tasks[i];
            const currentStep = i + 1;
            const taskName = typeof task.name === 'function' ? task.name() : task.name;
            
            renderBar(currentStep, taskName);
            
            const isInteractive = taskName.includes("Language") || taskName.includes("语言") || taskName === t('config_ai');

            try {
                if (isInteractive) {
                     process.stdout.write('\x1b7\n'); 
                     await task.fn();
                     process.stdout.write('\x1b8');
                } else {
                    await task.fn();
                }
            } catch (e) {
                process.stdout.write(`\n${colors.red}✖ ${t('task_failed')}: ${e.message}${colors.reset}\n`);
                console.error(e);
                process.exit(1);
            }
        }
        
        process.stdout.write('\n');
        console.log(`${colors.green}✔ ${t('init_complete')}${colors.reset}\n`);
    }
}

function selectOption(question, options) {
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
            dim: "\x1b[90m",
            white: "\x1b[37m",
            cyan: "\x1b[36m",
            magenta: "\x1b[35m",
            green: "\x1b[32m",
            yellow: "\x1b[33m"
        };
        const neonColors = [palette.cyan, palette.magenta, palette.green, palette.yellow];
        options.forEach(opt => opt.descColor = neonColors[Math.floor(Math.random() * neonColors.length)]);
        
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

        stdin.setRawMode(true);
        stdin.resume();
        stdin.setEncoding('utf8');

        function cleanup() {
            stdout.write(cursorShow);
            stdin.setRawMode(false);
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

module.exports = {
    colors,
    log,
    TaskRunner,
    selectOption
};
