# Halo UI 扩展点：文章数据列表操作菜单 (post:list-item:operation:create)

## 1. 扩展点 ID
`post:list-item:operation:create`

## 2. 用途
允许插件向文章列表每一项的“更多操作”菜单中注入自定义的菜单项。这常用于实现针对单篇文章的特殊操作（如：导出文章为 PDF、推送到百度搜索、生成分享海报等）。

## 3. 核心接口 `OperationItem<ListedPost>`
*   **`label`**: 菜单项文本。
*   **`action`**: 点击后的回调函数，会收到当前行的数据对象 `item`。
*   **`component`**: 可选，自定义菜单项组件（如果不想使用标准菜单样式）。
*   **`permissions`**: 可选，显示该菜单项所需的权限。

## 4. 注册示例
```typescript
extensionPoints: {
  "post:list-item:operation:create": [
    {
      label: "导出为 Markdown",
      action: (item) => {
        downloadFile(item.spec.title + ".md", item.spec.raw);
      },
      priority: 5,
    },
  ],
}
```
