const fs = require('fs');
const path = require('path');
const { colors } = require('../core/ui');
const { HPS_DIR } = require('../core/utils');
const templates = require('../data/templates');

async function cmdNew(args) { // Note: args should be passed here
    // Handle case where args might not be passed correctly in current dispatcher
    // The main dispatcher calls `await cmdNew()` without args in the original code, 
    // but we need to change that in `hps.js` too. Assuming args are passed or we parse process.argv
    
    // In hps.js, we need to ensure `cmdNew(args.slice(1))` is called.
    // For now, let's implement the logic assuming args[0] is the name.
    
    // Fallback if not passed directly (to be safe during transition)
    const featureName = (args && args[0]) ? args[0] : null;

    if (!featureName) {
        console.log(`${colors.red}Error: Feature name required.${colors.reset}`);
        console.log(`Usage: hps new <feature-name>`);
        return;
    }

    const changeDir = path.join(process.cwd(), HPS_DIR, 'changes', featureName);

    if (fs.existsSync(changeDir)) {
        console.log(`${colors.yellow}Warning: Spec for '${featureName}' already exists.${colors.reset}`);
        return;
    }

    console.log(`${colors.cyan}Creating HPS Spec for '${featureName}'...${colors.reset}`);

    fs.mkdirSync(changeDir, { recursive: true });

    // 1. Generate Requirement Spec
    fs.writeFileSync(
        path.join(changeDir, 'requirement.md'), 
        templates.hpsRequirement(featureName)
    );

    // 2. Generate Tasks Spec
    fs.writeFileSync(
        path.join(changeDir, 'tasks.md'), 
        templates.hpsTasks()
    );

    console.log(`
${colors.green}✔ Spec Initialized!${colors.reset}

Please edit the following files to define your feature:
1. ${colors.bright}.hps/changes/${featureName}/requirement.md${colors.reset} (What to do)
2. ${colors.bright}.hps/changes/${featureName}/tasks.md${colors.reset}       (How to do)

Next Step:
Run ${colors.bright}hps code ${featureName}${colors.reset} to generate the implementation prompt.
`);
}

module.exports = cmdNew;