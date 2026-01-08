const locales = {
    en: {
        // CLI UI
        start_workflow: "🚀 Starting Initialization Workflow...",
        select_lang: "Select Language / 选择语言",
        creating_project: "Creating Halo Plugin Project",
        init_kb: "Initializing HPS Knowledge Base",
        config_ai: "Configuring AI Assistant",
        select_ai: "Select your primary AI Assistant",
        gen_files: "Generating Context Files",
        project_ready: "👉 Project ready! Run:",
        task_failed: "Task Failed",
        init_complete: "Initialization Complete!",
        
        // Command New
        new_feature_title: "🆕 HPS: New Feature Proposal",
        enter_feature_name: "? Feature name (e.g., daily-checkin): ",
        feature_name_required: "Feature name is required.",
        feature_exists: "Feature \"{name}\" already exists.",
        creating_workspace: "Creating workspace for \"{name}\"...",
        workspace_created: "Workspace created at {path}",

        // OpenSpec Templates
        proposal_template: `# Proposal: {name}
## 1. User Intent
(Describe what you want to achieve...)
## 2. Technical Scope
- [ ] Extension Definitions
- [ ] Reconciler Logic
- [ ] UI Components
- [ ] Permissions (RBAC)
## 3. Discussion Notes
(AI notes will go here...)
`,
        tasks_template: `# Implementation Tasks: {name}

## 1. Model Tasks (Extension Definitions)
- [ ] Define \`Extension\` (GVK, Spec, Status)
- [ ] Define \`ExtensionDefinition\` (YAML)

## 2. Logic Tasks (Backend)
- [ ] Implement \`Reconciler\`
- [ ] Implement \`Service\` (if needed)
- [ ] Implement \`Controller\` (if needed)
- [ ] Add Unit Tests

## 3. UI Tasks (Frontend)
- [ ] Create \`Console\` Views
- [ ] Register \`ExtensionPoints\`
- [ ] Add Permissions

## 4. Verification
- [ ] Manual Test
- [ ] Automated Test
`,

        // AI Options
        opt_gemini: "Optimized for 1M+ Long Context",
        opt_cursor: "Generates .cursorrules",
        opt_copilot: "Generates .github/copilot-instructions.md",
        opt_ollama: "Generates Modelfile",
        opt_general: "Generates generic context file",

        // Prompt Templates
        system_identity: "# SYSTEM IDENTITY: Halo Plugin Architect",
        role_desc: "You are an expert in developing plugins for Halo 2.x.\nYour goal is to assist the user in designing and implementing high-quality, compliant plugins.",
        kb_title: "# CORE KNOWLEDGE BASE",
        master_spec_title: "## 1. Master Specification (CRITICAL)",
        collab_title: "## 2. Collaboration Protocol",
        doc_index_title: "## 3. Documentation Index (Available on Request)",
        doc_index_desc: "I have access to the following technical summaries.\nIf the user asks for specific features (e.g., \"upload\"), refer to the relevant document ID from this list:",
        instructions_title: "# INSTRUCTIONS",
        inst_1: "1. Always follow the 'Spec-Driven' workflow: Discuss -> Spec -> Code.",
        inst_2: "2. If I use 'hps' commands, understand I am using the Halo Plugin Spec CLI.",
        inst_3: "3. Prioritize 'Reactive' and 'Asynchronous' patterns as per the Master Spec."
    },
    zh: {
        // CLI UI
        start_workflow: "🚀 开始初始化工作流...",
        select_lang: "Select Language / 选择语言",
        creating_project: "创建 Halo 插件项目结构",
        init_kb: "初始化 HPS 知识库",
        config_ai: "配置 AI 助手",
        select_ai: "选择你的主要 AI 助手",
        gen_files: "生成上下文文件",
        project_ready: "👉 项目已就绪！请运行:",
        task_failed: "任务失败",
        init_complete: "初始化完成！",

        // Command New
        new_feature_title: "🆕 HPS: 新功能提案 (OpenSpec)",
        enter_feature_name: "? 功能名称 (例如: daily-checkin): ",
        feature_name_required: "必须输入功能名称。",
        feature_exists: "功能 \"{name}\" 已存在。",
        creating_workspace: "正在为 \"{name}\" 创建工作区...",
        workspace_created: "工作区已创建于 {path}",

        // OpenSpec Templates
        proposal_template: `# 提案: {name}
## 1. 用户意图 (User Intent)
(请在此描述你想实现的功能...)
## 2. 技术范围 (Technical Scope)
- [ ] 自定义模型 (Extension Definitions)
- [ ] 协调器逻辑 (Reconciler Logic)
- [ ] 界面组件 (UI Components)
- [ ] 权限控制 (Permissions/RBAC)
## 3. 讨论记录 (Discussion Notes)
(AI 将在此处记录分析过程...)
`,
        tasks_template: `# 实施任务清单: {name}

## 1. 模型任务 (Extension Definitions)
- [ ] 定义 \`Extension\` (GVK, Spec, Status)
- [ ] 定义 \`ExtensionDefinition\` (YAML)

## 2. 逻辑任务 (Backend)
- [ ] 实现 \`Reconciler\` (协调器)
- [ ] 实现 \`Service\` (如果需要)
- [ ] 实现 \`Controller\` (如果需要)
- [ ] 添加单元测试 (Unit Tests)

## 3. 界面任务 (Frontend)
- [ ] 创建 \`Console\` 视图组件
- [ ] 注册 \`ExtensionPoints\` (扩展点)
- [ ] 添加权限控制 (Permissions)

## 4. 验证 (Verification)
- [ ] 手动测试
- [ ] 自动化测试
`,

        // AI Options
        opt_gemini: "针对 1M+ 长上下文优化 (推荐)",
        opt_cursor: "生成 .cursorrules 规则文件",
        opt_copilot: "生成 Copilot 指令文件",
        opt_ollama: "生成 Modelfile 模型文件",
        opt_general: "生成通用上下文提示词",

        // Prompt Templates
        system_identity: "# 系统身份: Halo 插件架构师",
        role_desc: "你是 Halo 2.x 插件开发的顶级专家。\n你的目标是辅助用户设计并实现高质量、符合官方规范的插件。",
        kb_title: "# 核心知识库",
        master_spec_title: "## 1. 核心规范 (关键)",
        collab_title: "## 2. 协作协议",
        doc_index_title: "## 3. 技术文档索引 (按需查阅)",
        doc_index_desc: "你可以访问以下技术总结文档。\n如果用户询问特定功能（如“上传”），请根据此列表引用相关的文档 ID：",
        instructions_title: "# 指令",
        inst_1: "1. 始终遵循 'Spec-Driven' 工作流：讨论 -> 规格 -> 代码。",
        inst_2: "2. 如果我使用 'hps' 命令，请理解我正在使用 Halo Plugin Spec CLI。",
        inst_3: "3. 根据核心规范，优先使用 'Reactive' (响应式) 和 'Asynchronous' (异步) 模式。"
    }
};

let currentLang = 'en';

function setLang(lang) {
    if (locales[lang]) currentLang = lang;
}

function t(key) {
    return locales[currentLang][key] || locales['en'][key] || key;
}

function getLang() {
    return currentLang;
}

module.exports = {
    setLang,
    t,
    getLang,
    locales
};
