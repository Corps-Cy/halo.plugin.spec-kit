const fs = require('fs');
const path = require('path');
const { TaskRunner, selectOption, colors, log } = require('../core/ui');
const { HPS_DIR, readFileSafe, loadHpsConfig } = require('../core/utils');

async function cmdApply(featureName) {
    if (!featureName) {
        log.error("Usage: hps apply <feature-name>");
        return;
    }

    const featureDir = path.join(HPS_DIR, 'changes', featureName);
    const specDir = path.join(featureDir, 'specs');
    const truthDir = path.join(HPS_DIR, 'current_state');

    if (!fs.existsSync(specDir)) {
        log.error(`No specifications found in ${specDir}`);
        return;
    }

    const runner = new TaskRunner();
    const specs = fs.readdirSync(specDir).filter(f => f.endsWith('.md'));
    
    let validatedSpecs = [];

    // 1. Loading
    runner.addTask("Loading Change Set", async () => {
        if (specs.length === 0) throw new Error("Change set is empty");
    });

    // 2. Validation
    runner.addTask("Validating Halo Specifications", async () => {
        for (const file of specs) {
            const content = readFileSafe(path.join(specDir, file));
            const hasGVK = content.includes('group') && content.includes('version') && content.includes('kind');
            const hasSpec = content.toLowerCase().includes('spec');
            
            if (!hasGVK) {
                log.info(`Warning: ${file} might be missing @GVK definition.`);
            }
            validatedSpecs.push({ file, content, isValid: hasGVK && hasSpec });
        }
    });

    // 3. Diff Analysis
    runner.addTask("Analyzing Architecture Impact", async () => {
        console.log(`\n   ${colors.magenta}Proposed Changes:${colors.reset}`);
        specs.forEach(file => {
            const exists = fs.existsSync(path.join(truthDir, file));
            const status = exists ? `${colors.yellow}[MODIFIED]${colors.reset}` : `${colors.green}[NEW]${colors.reset}`;
            console.log(`     ${status} ${file}`);
        });
    });

    // 4. Consensus Check
    runner.addTask("Requesting Human Approval", async () => {
        process.stdout.write('\r\x1b[K'); 
        const confirm = await selectOption(`\n? Apply these specifications to the Source of Truth?`, [
            { label: "Yes, Merge it", value: "yes", description: "This will overwrite existing specs" },
            { label: "No, Abort", value: "no", description: "Keep changes in draft" }
        ]);
        
        if (confirm !== 'yes') throw new Error("User aborted the merge.");
    });

    // 5. Merging
    runner.addTask("Updating Source of Truth", async () => {
        validatedSpecs.forEach(spec => {
            const dest = path.join(truthDir, spec.file);
            fs.writeFileSync(dest, spec.content);
        });
    });

    // 6. Finalizing
    runner.addTask("Syncing Project Registry", async () => {
        const configPath = path.join(HPS_DIR, 'config.json');
        const config = loadHpsConfig();
        
        config.last_merged_feature = featureName;
        config.last_merged_at = new Date().toISOString();
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    });

    await runner.run();
}

module.exports = cmdApply;