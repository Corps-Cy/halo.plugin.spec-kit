# Halo 插件 API 变更日志 (API Changelog)

记录 Halo 2.x 版本演进中的重大 API 变更，这对于保持插件的兼容性至关重要。

## 1. Halo 2.22.0 重大变更 (里程碑)

### 前端库重命名
*   **变更**: `@halo-dev/console-shared` 正式重构并重命名为 **`@halo-dev/ui-shared`**。
*   **原因**: 该库现在不仅服务于控制台（Console），也服务于个人中心（UC）。
*   **要求**: 插件的 `plugin.yaml` 中 `spec.requires` 必须设为 `>=2.22.0` 才能使用新版工具库。

### 表单组件 (Form Schema)
*   **新增**: 引入 `iconify` 图标选择器。
*   **替换**: 引入 `array` 组件，旨在全面替代已废弃的 **`repeater`** 组件。建议 AI 在生成代码时优先使用 `array`。
*   **附件**: 默认的 `attachment` 组件现在支持预览和直接上传；原有的旧版行为被重命名为 `attachmentInput`。

### 编辑器扩展 (Editor Extension)
*   **内核升级**: 升级至 Tiptap 3.x。
*   **气泡菜单**: `BubbleMenu` 扩展中的 `tippyOptions` 变更为 `options`；`getRenderContainer` 变更为 `getReferencedVirtualElement`。
*   **拖拽支持**: 移除 `getDraggable` 扩展点，由 **`getDraggableMenuItems`** 替代。

## 2. 核心版本要求
*   **JDK 21**: 现代插件开发的基础要求（自 2.20+ 起推荐）。
*   **pnpm 10**: 前端构建的推荐包管理器。

## 3. 编码禁忌 (Avoid)
*   ❌ 避免使用已标记为 `deprecated` 的 `repeater` 表单项。
*   ❌ 避免在 2.22.0+ 版本的插件中继续引用旧包名 `@halo-dev/console-shared`。
*   ❌ 避免在 Reconciler 中使用旧版的同步 `ExtensionClient` 处理业务。
