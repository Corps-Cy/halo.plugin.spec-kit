const fs = require('fs');
const path = require('path');
const { colors, log } = require('../core/ui');
const { HPS_DIR, readFileSafe, getHaloContext, copyToClipboard, loadHpsConfig } = require('../core/utils');

async function cmdContext(featureName) {
    if (!featureName) {
        log.error("Usage: hps context <feature-name>");
        return;
    }
    const featureDir = path.join(HPS_DIR, 'changes', featureName);
    if (!fs.existsSync(featureDir)) {
        log.error(`Feature "${featureName}" not found.`);
        return;
    }

    console.log(`${colors.bright}${colors.magenta}🧠 HPS: Assembling Context for "${featureName}"${colors.reset}\n`);
    const proposal = readFileSafe(path.join(featureDir, 'proposal.md'));
    const tasks = readFileSafe(path.join(featureDir, 'tasks.md'));
    
    log.step("Searching relevant Halo documentation...");
    const keywords = ["extension", "reconciler", "ui", "api", "attachment", "permission", "role", "notifier", "theme"];
    const matchedDocs = [];
    const docDir = 'docs_summaries';
    
    if (fs.existsSync(docDir)) {
        const files = fs.readdirSync(docDir).filter(f => f.endsWith('.md'));
        files.forEach(file => {
            const content = readFileSafe(path.join(docDir, file)).toLowerCase();
            const hit = keywords.find(k => content.includes(k) && proposal.toLowerCase().includes(k));
            if (hit) matchedDocs.push(file);
        });
    }

    log.step("Building tailored prompt...");
    const contextData = getHaloContext();
    const config = loadHpsConfig();
    
    let prompt = `[TASK: DESIGN_FEATURE]
Feature: ${featureName}
Proposal Content:
${proposal}

Tasks:
${tasks}

[RELEVANT_DOCS_FOUND]
${matchedDocs.map(d => `Reference: ${d}`).join('\n')}

[PROJECT_CONSTRAINTS]
${contextData.masterSpec}

[INSTRUCTIONS]
Based on the proposal and relevant docs, please help me design the specifications for this feature.
Output your design in Markdown format suitable for saving in .hps/changes/${featureName}/specs/
`;

    const outfile = path.join(featureDir, 'PROMPT_TO_AI.md');
    fs.writeFileSync(outfile, prompt);
    log.success(`Context assembled!`);
    
    if (copyToClipboard(prompt)) {
        console.log(`\n${colors.green}📋 Content copied to clipboard! Just paste (Cmd+V) into Gemini.${colors.reset}`);
    } else {
        log.info(`Generated Prompt: ${outfile}`);
    }
}

module.exports = cmdContext;