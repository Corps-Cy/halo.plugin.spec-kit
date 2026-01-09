const fs = require('fs');
const path = require('path');

// Global State
let currentLang = 'en';

const locales = {
    en: {
        start_workflow: "🚀 Starting Initialization Workflow...",
        select_lang: "Select Language / 选择语言 / 言語を選択",
        creating_project: "Creating Halo Plugin Project",
        init_kb: "Initializing HPS Knowledge Base",
        config_ai: "Configuring AI Assistant",
        select_ai: "Select your primary AI Assistant",
        gen_files: "Generating Context Files",
        launching_ai_task: "Launching AI Environment",
        project_ready: "👉 Project ready! Run:",
        task_failed: "Task Failed",
        init_complete: "Initialization Complete!",
        
        launch_prompt: "✨ Setup Complete! Launch {tool} environment now?",
        launch_yes: "Yes, launch it! 🚀",
        launch_yes_desc: "Start developing immediately",
        launch_no: "No, later",
        launch_no_desc: "I will run 'hps start' later",
        switching_context: "Switching context to {dir}...",
        launching_ai: "Launching AI",
        launch_failed: "Failed to launch",
        
        opt_gemini: "Optimized for 1M+ Long Context (Recommended)",
        opt_cursor: "Generates .cursorrules rules",
        opt_copilot: "Generates Copilot instruction file",
        opt_ollama: "Generates Ollama Modelfile",
        opt_claude: "Launch with Claude CLI (Beta)",
        opt_general: "Generates generic context file",

        manual_launch_tip: "⚠️  Due to terminal limits, please run this:",
        cmd_copied: "(Command copied to clipboard)",
        claude_tip: "Tip: In Claude, type '/add .hps/claude_context.md'",

        // Nav Hints
        nav_hint: "(Use ↑/↓ to navigate, Enter to select, ← to go back)",
        nav_hint_first: "(Use ↑/↓ to navigate, Enter to select)",

        new_feature_title: "🆕 HPS: New Feature Proposal",
        enter_feature_name: "? Feature name (e.g., daily-checkin): ",
        feature_name_required: "Feature name is required.",
        feature_exists: "Feature \"{name}\" already exists.",
        creating_workspace: "Creating workspace for \"{name}\"...",
        workspace_created: "Workspace created at {path}"
    },
    zh: {
        start_workflow: "🚀 开始初始化工作流...",
        select_lang: "选择语言 / Select Language / 言語を選択",
        creating_project: "创建 Halo 插件项目结构",
        init_kb: "初始化 HPS 知识库",
        config_ai: "配置 AI 助手",
        select_ai: "选择你的主要 AI 助手",
        gen_files: "生成上下文文件",
        launching_ai_task: "启动 AI 环境",
        project_ready: "👉 项目已就绪！请运行:",
        task_failed: "任务失败",
        init_complete: "初始化完成！",

        launch_prompt: "✨ 设置完成！是否立即启动 {tool} 环境？",
        launch_yes: "是的，立即启动！🚀",
        launch_yes_desc: "马上开始开发",
        launch_no: "不，稍后再说",
        launch_no_desc: "我稍后手动运行 'hps start'",
        switching_context: "正在切换目录至 {dir}...",
        launching_ai: "正在启动 AI",
        launch_failed: "启动失败",
        
        opt_gemini: "针对 1M+ 长上下文优化 (推荐)",
        opt_cursor: "生成 .cursorrules 规则文件",
        opt_copilot: "生成 Copilot 指令文件",
        opt_ollama: "生成 Modelfile 模型文件",
        opt_claude: "使用 Claude CLI 启动 (Beta)",
        opt_general: "生成通用上下文提示词",

        manual_launch_tip: "⚠️  由于终端限制，请手动运行：",
        cmd_copied: "(命令已复制到剪贴板)",
        claude_tip: "提示：在 Claude 中输入 '/add .hps/claude_context.md'。",

        // Nav Hints
        nav_hint: "(↑/↓ 选择, Enter 确认, ← 返回上一步)",
        nav_hint_first: "(↑/↓ 选择, Enter 确认)",

        new_feature_title: "🆕 HPS: 新功能提案 (OpenSpec)",
        enter_feature_name: "? 功能名称 (例如: daily-checkin): ",
        feature_name_required: "必须输入功能名称。",
        feature_exists: "功能 \"{name}\" 已存在。",
        creating_workspace: "正在为 \"{name}\" 创建工作区...",
        workspace_created: "工作区已创建于 {path}"
    },
    ja: {
        start_workflow: "🚀 初期化ワークフローを開始...",
        select_lang: "言語を選択 / Select Language / 选择语言",
        creating_project: "Halo プラグインの構造を作成中",
        init_kb: "HPS ナレッジベースを初期化中",
        config_ai: "AI アシスタントを設定中",
        select_ai: "メインの AI アシスタントを選択",
        gen_files: "コンテキストファイルを生成中",
        launching_ai_task: "AI 環境を起動中",
        project_ready: "👉 プロジェクトの準備が完了しました！",
        task_failed: "タスク失敗",
        init_complete: "初期化完了！",

        launch_prompt: "✨ 設定完了！今すぐ {tool} 環境を起動しますか？",
        launch_yes: "はい、起動します！🚀",
        launch_yes_desc: "すぐに開発を開始",
        launch_no: "いいえ、後で",
        launch_no_desc: "後で 'hps start' を実行します",
        switching_context: "{dir} にディレクトリを切り替えています...",
        launching_ai: "AIを起動中",
        launch_failed: "起動に失敗しました",
        
        opt_gemini: "1M+ ロングコンテキスト向け最適化 (推奨)",
        opt_cursor: ".cursorrules ルールファイルを生成",
        opt_copilot: "Copilot 指示ファイルを生成",
        opt_ollama: "Modelfile を生成",
        opt_claude: "Claude CLI で起動 (Beta)",
        opt_general: "一般的なコンテキストファイルを生成",

        manual_launch_tip: "⚠️  シェルの制限により、手动で実行してください：",
        cmd_copied: "(コマンドをクリップボードにコピーしました)",
        claude_tip: "ヒント：Claudeで '/add .hps/claude_context.md' と入力してください。",

        // Nav Hints
        nav_hint: "(↑/↓ 選択, Enter 決定, ← 戻る)",
        nav_hint_first: "(↑/↓ 選択, Enter 決定)",

        new_feature_title: "🆕 HPS: 新機能の提案",
        enter_feature_name: "? 功能名称 (例: daily-checkin): ",
        feature_name_required: "機能名は必須です。",
        feature_exists: "機能 \"{name}\" は既に存在します。",
        creating_workspace: "\"{name}\" のワークスペースを作成中...",
        workspace_created: "ワークスペースが {path} に作成されました"
    }
};

function setLang(lang) {
    if (locales[lang]) currentLang = lang;
}

function t(key) {
    const dict = locales[currentLang] || locales['en'];
    return dict[key] || key;
}

function getLang() {
    return currentLang;
}

function init() {
    try {
        const configPath = path.join(process.cwd(), '.hps', 'config.json');
        if (fs.existsSync(configPath)) {
            const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            if (config.language) setLang(config.language);
        }
    } catch (e) {}
}

module.exports = { setLang, t, getLang, init, locales };
