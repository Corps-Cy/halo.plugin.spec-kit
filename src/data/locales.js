const fs = require('fs');
const path = require('path');

// State
let currentLang = 'en';

// Dictionary
const locales = {
    en: {
        // UI Messages
        creating_project: "Creating project structure",
        init_kb: "Initializing Knowledge Base",
        config_ai: "Configuring AI Assistant",
        select_ai: "Select your preferred AI workflow:",
        gen_files: "Generating Context Files",
        project_ready: "Project initialized! To start coding:",
        
        opt_gemini: "Use Google Gemini CLI (Recommended for full automation)",
        opt_cursor: "Use Cursor IDE (Best for interactive dev)",
        opt_copilot: "Use GitHub Copilot (Manual prompt injection)",
        opt_ollama: "Use Ollama / Local LLM",
        opt_general: "General / Other Tools",
        
        task_failed: "Task Failed",
        init_complete: "Setup Complete!",
        
        // HPS New
        new_feature_title: "Drafting New Feature Spec",
        enter_feature_name: "Enter feature name (e.g., daily-checkin): ",
        feature_name_required: "Feature name is required.",
        feature_exists: "Feature '{name}' already exists.",
        creating_workspace: "Creating workspace for '{name}'...",
        workspace_created: "Workspace created at {path}",
        
        // Templates - Proposal
        proposal_template: `# Feature Proposal: {name}\n\n## Goal\nDescribe what you want to achieve...`,
        tasks_template: `# Implementation Tasks\n\n- [ ] Task 1...`,

        // HPS Start
        launching_ai: "Launching AI Environment",
        
        // System Prompts Parts
        system_identity: "You are an expert Halo 2.x Plugin Developer.",
        role_desc: "Your goal is to build plugins using Reactive programming and Extension-based architecture.",
        kb_title: "## Knowledge Base",
        master_spec_title: "### Master Specification",
        collab_title: "### Collaboration Manual",
        doc_index_title: "### Documentation Index",
        doc_index_desc: "Refer to these docs for specific implementations:",
        instructions_title: "## Critical Instructions",
        inst_1: "1. Always check the Master Spec for architectural constraints.",
        inst_2: "2. Use Project Reactor for all backend logic.",
        inst_3: "3. Define Extensions (GVK) before writing Controllers."
    },
    zh: {
        // UI Messages
        creating_project: "创建项目结构",
        init_kb: "初始化知识库",
        config_ai: "配置 AI 助手",
        select_ai: "选择您的 AI 工作流:",
        gen_files: "生成上下文文件",
        project_ready: "项目初始化完成！开始开发:",
        
        opt_gemini: "使用 Google Gemini CLI (推荐，全自动)",
        opt_cursor: "使用 Cursor IDE (交互体验最佳)",
        opt_copilot: "使用 GitHub Copilot (需手动注入)",
        opt_ollama: "使用 Ollama / 本地大模型",
        opt_general: "通用 / 其他工具",
        
        task_failed: "任务失败",
        init_complete: "设置完成！",

        // HPS New
        new_feature_title: "起草新功能规格",
        enter_feature_name: "输入功能名称 (例如 daily-checkin): ",
        feature_name_required: "必须输入功能名称。",
        feature_exists: "功能 '{name}' 已存在。",
        creating_workspace: "正在创建 '{name}' 的工作区...",
        workspace_created: "工作区已创建: {path}",
        
        // Templates - Proposal
        proposal_template: `# 功能提案: {name}\n\n## 目标\n请描述您想实现的功能...`,
        tasks_template: `# 实施任务清单\n\n- [ ] 任务 1...`,

        // HPS Start
        launching_ai: "正在启动 AI 环境",
        
        // System Prompts Parts
        system_identity: "你是 Halo 2.x 插件开发专家。",
        role_desc: "你的目标是使用响应式编程和扩展架构构建高质量插件。",
        kb_title: "## 知识库",
        master_spec_title: "### 核心规范 (Master Spec)",
        collab_title: "### 协作手册",
        doc_index_title: "### 文档索引",
        doc_index_desc: "请参考以下文档进行具体实现：",
        instructions_title: "## 关键指令",
        inst_1: "1. 始终遵循 Master Spec 中的架构约束。",
        inst_2: "2. 后端逻辑必须使用 Project Reactor。",
        inst_3: "3. 写控制器前必须先定义扩展 (GVK)。"
    }
};

function setLang(lang) {
    if (locales[lang]) {
        currentLang = lang;
    } else {
        console.warn(`Language '${lang}' not supported, falling back to 'en'.`);
        currentLang = 'en';
    }
}

function getLang() {
    return currentLang;
}

function t(key) {
    const dict = locales[currentLang] || locales['en'];
    return dict[key] || key;
}

// Auto-load from config file
function init() {
    try {
        const configPath = path.join(process.cwd(), '.hps', 'config.json');
        if (fs.existsSync(configPath)) {
            const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            if (config.language) {
                setLang(config.language);
            }
        }
    } catch (e) {
        // ignore errors during init (e.g. running hps init for the first time)
    }
}

module.exports = {
    locales,
    setLang,
    getLang,
    t,
    init
};