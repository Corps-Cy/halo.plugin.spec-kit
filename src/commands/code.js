const fs = require('fs');
const path = require('path');
const { colors, log } = require('../core/ui');
const { HPS_DIR, copyToClipboard, getSmartContext } = require('../core/utils');

async function cmdCode(args) {
    const featureName = (Array.isArray(args) ? args[0] : args) || null;

    if (!featureName) {
        log.error("Usage: hps code <feature-name>");
        return;
    }

    const changeDir = path.join(process.cwd(), HPS_DIR, 'changes', featureName);
    const reqPath = path.join(changeDir, 'requirement.md');
    // We also support 'tasks.md' but logic is primarily driven by requirement
    const taskPath = path.join(changeDir, 'tasks.md');
    const projectPath = path.join(process.cwd(), HPS_DIR, 'project.md');

    if (!fs.existsSync(reqPath)) {
        log.error(`Spec not found for '${featureName}'.`);
        console.log(`Tip: Run 'hps new ${featureName}' first.`);
        return;
    }

    // 1. Read User Input (The "Seed")
    const requirement = fs.readFileSync(reqPath, 'utf8');
    const tasks = fs.existsSync(taskPath) ? fs.readFileSync(taskPath, 'utf8') : '';
    const projectSpec = fs.existsSync(projectPath) ? fs.readFileSync(projectPath, 'utf8') : '';
    
    // 2. Smart Context Injection (The "Fertilizer")
    log.step(`Analyzing requirements for feature '${featureName}'...`);
    const smartCtx = getSmartContext(requirement + "\n" + tasks);
    
    if (smartCtx.stats.loaded > 0) {
        console.log(`${colors.cyan}ℹ Smart Context:${colors.reset} Injected ${colors.bright}${smartCtx.stats.loaded}${colors.reset} relevant docs.`);
        if (smartCtx.stats.keywords.length > 0) {
            console.log(`${colors.dim}  Keywords detected: ${smartCtx.stats.keywords.join(', ')}${colors.reset}`);
        }
    } else {
        console.log(`${colors.yellow}ℹ No specific technical keywords found. Using core specs only.${colors.reset}`);
    }

    // 3. Assemble Final Prompt
    const prompt = `
# INSTRUCTION: Implement Feature "${featureName}"

## 1. Project Context (Strict Constraints)
${projectSpec}

## 2. Technical Knowledge (Dynamically Loaded)
${smartCtx.content}

## 3. Feature Requirements
${requirement}

## 4. Implementation Plan
${tasks}

## 5. Execution Rules
- You MUST follow the "Implementation Plan" step-by-step.
- You MUST adhere to the "Project Context" (Reactor, GVK, etc.).
- Output the code changes in a structured format (e.g., file by file).
`;

    // 4. Output
    const promptPath = path.join(changeDir, 'prompt_generated.md');
    fs.writeFileSync(promptPath, prompt);

    console.log(`\n${colors.green}✔ Context Generated at: ${promptPath}${colors.reset}`);
    console.log(`${colors.bright}🤖 AI AGENT INSTRUCTION:${colors.reset}`);
    console.log(`[ACTION_REQUIRED] Please READ the file '${promptPath}' now to obtain your coding instructions.`);
    
    // Fallback copy
    copyToClipboard(`Please read ${promptPath} and implement the feature.`);
}

module.exports = cmdCode;
