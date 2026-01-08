const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { colors, log } = require('../core/ui');
const { t, setLang, getLang } = require('../data/locales');

// Helper to load config
function loadConfig() {
    const configPath = path.join('.hps', 'config.json');
    if (fs.existsSync(configPath)) {
        try {
            const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            if (config.language) setLang(config.language);
        } catch (e) {
            // ignore error, use default
        }
    }
}

async function cmdNew() {
    loadConfig();
    console.log(`${colors.bright}${colors.blue}${t('new_feature_title')}${colors.reset}\n`);
    
    const CHANGES_DIR = path.join('.hps', 'changes');

    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const name = await new Promise(resolve => rl.question(`${colors.cyan}${t('enter_feature_name')}${colors.reset}`, ans => {
        rl.close();
        resolve(ans.trim().toLowerCase().replace(/\s+/g, '-'));
    }));

    if (!name) {
        log.error(t('feature_name_required'));
        return;
    }

    const featureDir = path.join(CHANGES_DIR, name);
    
    if (fs.existsSync(featureDir)) {
        log.error(t('feature_exists').replace('{name}', name));
        return;
    }

    log.step(t('creating_workspace').replace('{name}', name));
    fs.mkdirSync(path.join(featureDir, 'specs'), { recursive: true });
    
    // Get templates from locale
    const proposalTemplate = t('proposal_template').replace(/{name}/g, name);
    fs.writeFileSync(path.join(featureDir, 'proposal.md'), proposalTemplate);

    const tasksTemplate = t('tasks_template').replace(/{name}/g, name);
    fs.writeFileSync(path.join(featureDir, 'tasks.md'), tasksTemplate);
    
    log.success(t('workspace_created').replace('{path}', featureDir));
}

module.exports = cmdNew;
