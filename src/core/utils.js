const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { locales, getLang } = require('../data/locales');
const { knowledgeMap, coreDocs } = require('../data/knowledge_graph');

const HPS_DIR = '.hps';

function readFileSafe(filePath) {
    if (!fs.existsSync(filePath)) {
        return `[Error: File ${filePath} not found]`
    }
    return fs.readFileSync(filePath, 'utf8');
}

function loadHpsConfig() {
    const configPath = path.join(HPS_DIR, 'config.json');
    if (fs.existsSync(configPath)) {
        try {
            return JSON.parse(fs.readFileSync(configPath, 'utf8'));
        } catch (e) {
            return {};
        }
    }
    return {};
}

function copyToClipboard(text) {
    try {
        if (process.platform === 'darwin') {
            execSync('pbcopy', { input: text });
            return true;
        } else if (process.platform === 'win32') {
            execSync('clip', { input: text });
            return true;
        } else {
            try { execSync('xclip -selection clipboard', { input: text, stdio: 'ignore' }); return true; } catch(e){}
            try { execSync('xsel -b', { input: text, stdio: 'ignore' }); return true; } catch(e){}
            return false;
        }
    } catch (err) {
        return false;
    }
}

// Helper to get resources path within the package
function getResourcesPath() {
    // Current: src/core/utils.js
    // Target: resources/
    return path.join(__dirname, '../../resources');
}

function getHaloContext() {
    const resDir = getResourcesPath();
    const masterSpec = readFileSafe(path.join(resDir, 'ai_specs', '00_master_spec.md'));
    const collabManual = readFileSafe(path.join(resDir, 'ai_specs', '01_collaboration_manual.md'));

    let docIndex = "";
    const docDir = path.join(resDir, 'docs_summaries');
    if (fs.existsSync(docDir)) {
        const files = fs.readdirSync(docDir).filter(f => f.endsWith('.md')).sort();
        docIndex = files.map(f => `- ${f}`).join('\n');
    }

    return { masterSpec, collabManual, docIndex };
}

function generateContextContent(context) {
    const lang = getLang();
    const txt = locales[lang];
    
    return `${txt.system_identity}
${txt.role_desc}

${txt.kb_title}

${txt.master_spec_title}
${context.masterSpec}

${txt.collab_title}
${context.collabManual}

${txt.doc_index_title}
${txt.doc_index_desc}
${context.docIndex}

${txt.instructions_title}
${txt.inst_1}
${txt.inst_2}
${txt.inst_3}
`;
}

// Smart Context Generation
function getSmartContext(userRequirement) {
    // 1. Locate docs inside the package
    const sourceDocsDir = path.join(getResourcesPath(), 'docs_summaries');
    
    if (!fs.existsSync(sourceDocsDir)) {
        return { content: "Warning: Documentation library not found in package.", stats: { total: 0, loaded: 0 } };
    }

    const requirementLower = userRequirement.toLowerCase();
    const loadedDocs = new Set(coreDocs);
    const matchedKeywords = new Set();

    // 2. Match Keywords
    knowledgeMap.forEach(entry => {
        const isMatch = entry.keywords.some(k => requirementLower.includes(k));
        if (isMatch) {
            entry.keywords.forEach(k => { if (requirementLower.includes(k)) matchedKeywords.add(k); });
            entry.docs.forEach(doc => loadedDocs.add(doc));
        }
    });

    // 3. Read Content
    let combinedContent = "";
    let loadedCount = 0;

    loadedDocs.forEach(docFile => {
        const p = path.join(sourceDocsDir, docFile);
        if (fs.existsSync(p)) {
            const content = fs.readFileSync(p, 'utf8');
            combinedContent += `\n\n# Reference: ${docFile}\n${content}`;
            loadedCount++;
        }
    });

    // 4. Add Index
    const allFiles = fs.readdirSync(sourceDocsDir).filter(f => f.endsWith('.md'));
    const skippedFiles = allFiles.filter(f => !loadedDocs.has(f));
    const indexContent = `\n\n# Other Available Docs (Not Loaded)\nAI can request these if needed:\n` + skippedFiles.map(f => `- ${f}`).join('\n');

    return {
        content: combinedContent + indexContent,
        stats: {
            total: allFiles.length,
            loaded: loadedCount,
            keywords: Array.from(matchedKeywords)
        }
    };
}

module.exports = {
    HPS_DIR,
    readFileSafe,
    loadHpsConfig,
    getHaloContext,
    generateContextContent,
    getSmartContext,
    copyToClipboard
};