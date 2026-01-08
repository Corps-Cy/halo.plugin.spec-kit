const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { locales, getLang } = require('../data/locales');

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
            // Linux: Try xclip then xsel
            try { execSync('xclip -selection clipboard', { input: text, stdio: 'ignore' }); return true; } catch(e){}
            try { execSync('xsel -b', { input: text, stdio: 'ignore' }); return true; } catch(e){}
            return false;
        }
    } catch (err) {
        return false;
    }
}

function getHaloContext() {
    const masterSpec = readFileSafe(path.join('ai_specs', '00_master_spec.md'));
    const collabManual = readFileSafe(path.join('ai_specs', '01_collaboration_manual.md'));

    let docIndex = "";
    const docDir = 'docs_summaries';
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

module.exports = {
    HPS_DIR,
    readFileSafe,
    loadHpsConfig,
    getHaloContext,
    generateContextContent,
    copyToClipboard
};