const fs = require('fs');
const path = require('path');
const { TaskRunner, colors, log } = require('../core/ui');
const { readFileSafe, getHaloContext, copyToClipboard } = require('../core/utils');

const HPS_DIR = '.hps';

async function cmdCode(featureName) {
    if (!featureName) {
        log.error("Usage: hps code <feature-name>");
        return;
    }

    const featureDir = path.join(HPS_DIR, 'changes', featureName);
    const specDir = path.join(featureDir, 'specs');
    
    if (!fs.existsSync(specDir)) {
        log.error(`No specs found for ${featureName}. Did you run 'hps context' and 'hps apply' first?`);
        return;
    }

    const runner = new TaskRunner();
    let analysis = { backend: false, frontend: false, models: [] };
    
    // 1. Analysis
    runner.addTask("Analyzing Specifications", async () => {
        const files = fs.readdirSync(specDir).filter(f => f.endsWith('.md'));
        for (const file of files) {
            const content = readFileSafe(path.join(specDir, file)).toLowerCase();
            if (content.includes('kind') && content.includes('group')) {
                analysis.backend = true;
                const match = content.match(/kind:\s*(\w+)/);
                if (match) analysis.models.push(match[1]);
            }
            if (content.includes('ui:') || content.includes('route:') || content.includes('component')) {
                analysis.frontend = true;
            }
        }
    });

    // 2. Component Identification
    runner.addTask("Identifying Required Components", async () => {
        await new Promise(r => setTimeout(r, 300));
    });

    // 3. Tech Guide Retrieval
    runner.addTask("Retrieving Implementation Guides", async () => {
        analysis.backendDocs = ["17_extension_definition.md", "18_reconciler_writing.md", "12_object_management.md"];
        analysis.frontendDocs = ["13_plugin_ui_intro.md", "29_plugin_ui_routes.md", "30_plugin_ui_api_request.md"];
    });

    let promptToCopy = "";

    // 4. Prompt Generation
    runner.addTask("Generating Coding Prompts", async () => {
        const tasks = readFileSafe(path.join(featureDir, 'tasks.md'));
        const basePrompt = (role, task) => `[ROLE: ${role}]
[TASK: IMPLEMENTATION]
Feature: ${featureName}
Identified Models: ${analysis.models.join(', ')}

[IMPLEMENTATION_TASKS]
${tasks}

[SOURCE_OF_TRUTH]
(The AI should read the files in .hps/changes/${featureName}/specs/)

[STRICT_CONSTRAINTS]
1. Do NOT invent APIs. Use the ones defined in Specs.
2. Follow the async/reactive patterns found in the attached guides.
`;

        if (analysis.backend) {
            const backendPrompt = `${basePrompt('Java Backend Developer', 'Implement Extensions and Reconcilers')}

[REFERENCE_GUIDES]
${analysis.backendDocs.join('\n')}

[INSTRUCTION]
Generate the Java code for the Extension classes and Reconcilers.
Ensure Gradle dependencies are correct.
`;
            fs.writeFileSync(path.join(featureDir, 'CODING_PLAN_BACKEND.md'), backendPrompt);
            if (!promptToCopy) promptToCopy = backendPrompt;
        }

        if (analysis.frontend) {
            const frontendPrompt = `${basePrompt('Vue/TypeScript Developer', 'Implement UI Components')}

[REFERENCE_GUIDES]
${analysis.frontendDocs.join('\n')}

[INSTRUCTION]
Generate the Vue 3 components and routes.
Use @halo-dev/components library.
`;
            fs.writeFileSync(path.join(featureDir, 'CODING_PLAN_FRONTEND.md'), frontendPrompt);
            if (!promptToCopy) promptToCopy = frontendPrompt;
        }
    });

    await runner.run();

    console.log(`\n${colors.green}✔ Coding Plans Generated!${colors.reset}`);
    if (analysis.backend) console.log(`  👉 Backend: .hps/changes/${featureName}/CODING_PLAN_BACKEND.md`);
    if (analysis.frontend) console.log(`  👉 Frontend: .hps/changes/${featureName}/CODING_PLAN_FRONTEND.md`);

    if (promptToCopy) {
        if (copyToClipboard(promptToCopy)) {
            console.log(`\n${colors.green}📋 Primary coding plan copied to clipboard! Just paste (Cmd+V) into Gemini.${colors.reset}`);
        }
    }
}

module.exports = cmdCode;