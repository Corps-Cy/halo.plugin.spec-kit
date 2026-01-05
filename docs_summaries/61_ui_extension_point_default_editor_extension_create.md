# Halo UI 扩展点：默认编辑器扩展 (default:editor:extension:create)

## 1. 扩展点 ID
`default:editor:extension:create`

## 2. 用途
用于扩展 Halo 默认的富文本编辑器（基于 Tiptap）。插件可以通过此扩展点添加新的工具栏按钮、快捷指令、浮动菜单或自定义节点。

## 3. 核心功能
不仅可以返回标准 Tiptap 扩展，还支持 Halo 特有的 UI 配置：
*   **`getToolbarItems`**: 顶部工具栏项。
*   **`getCommandMenuItems`**: 斜杠命令 (`/`) 菜单项。
*   **`getBubbleMenu`**: 选中文本时的浮动菜单。
*   **`getToolboxItems`**: 工具箱菜单项。
*   **`getDraggable`**: 为块元素添加拖拽支持。

## 4. 注册示例
```typescript
extensionPoints: {
  "default:editor:extension:create": [
    {
      extension: MyCustomTiptapExtension,
      options: {
        getToolbarItems: (editor) => [
          {
            name: "my-bold",
            icon: "i-lucide-bold",
            action: () => editor.chain().focus().toggleBold().run(),
          }
        ],
      }
    },
  ],
}
```
