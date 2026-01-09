# Halo UI 扩展点：主题管理界面选项卡 (theme:list:tabs:create)

## 1. 扩展点 ID
`theme:list:tabs:create`

## 2. 用途
允许插件向主题管理界面（管理后台 -> 外观 -> 主题）添加自定义标签页。类似于插件安装扩展点，这通常用于提供第三方主题下载仓库或主题商店功能。

## 3. 核心接口 `ThemeListTab`
*   **`id`**: 标签页 ID。
*   **`label`**: 标签页标题。
*   **`component`**: 面板 Vue 组件。
*   **`priority`**: 排序优先级。

## 4. 注册示例
```typescript
extensionPoints: {
  "theme:list:tabs:create": [
    {
      id: "theme-store",
      label: "主题商店",
      component: ThemeStorePanel,
    },
  ],
}
```
