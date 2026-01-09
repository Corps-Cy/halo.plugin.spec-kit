# Halo UI 扩展点：编辑器集成 (editor:create)

## 1. 扩展点 ID
`editor:create`

## 2. 用途
允许插件为 Halo 注册全新的内容编辑器（如：Markdown 编辑器、所见即所得编辑器、画板编辑器等）。用户在发布文章时可以选择使用哪个编辑器。

## 3. 核心接口 `EditorProvider`
*   **`name`**: 编辑器唯一 ID。
*   **`displayName`**: 菜单中显示的名称。
*   **`logo`**: 可选图标。
*   **`component`**: 编辑器 Vue 组件。
*   **`rawType`**: 原始数据类型（如 `markdown`）。

## 4. 组件规范
编辑器组件必须实现以下交互：
*   **Props**:
    *   `title`: 文章标题。
    *   `raw`: 原始内容（源码）。
    *   `content`: 渲染后的 HTML。
    *   `uploadImage`: 可选的图片上传函数。
*   **Events**:
    *   `update:title`, `update:raw`, `update:content`: 同步数据。
    *   `update`: 通知父级数据已变更（用于触发自动保存）。

## 5. 注册示例
```typescript
extensionPoints: {
  "editor:create": [
    {
      name: "markdown-editor",
      displayName: "Markdown",
      component: MyMarkdownEditor,
      rawType: "markdown",
    },
  ],
}
```
