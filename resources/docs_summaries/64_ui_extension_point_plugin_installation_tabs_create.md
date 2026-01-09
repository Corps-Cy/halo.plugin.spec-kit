# Halo UI 扩展点：插件安装界面选项卡 (plugin:installation:tabs:create)

## 1. 扩展点 ID
`plugin:installation:tabs:create`

## 2. 用途
允许插件向插件安装界面（管理后台 -> 插件 -> 安装）添加自定义标签页。这常用于提供除了本地上传和远程下载之外的其他安装方式，最典型的应用是 **应用商店 (App Store)** 插件。

## 3. 核心接口 `PluginInstallationTab`
*   **`id`**: 标签页 ID。
*   **`label`**: 标签页标题。
*   **`component`**: 面板 Vue 组件。
*   **`priority`**: 排序优先级。

## 4. 注册示例
```typescript
extensionPoints: {
  "plugin:installation:tabs:create": [
    {
      id: "app-store",
      label: "应用商店",
      component: AppStorePanel,
      priority: 100,
    },
  ],
}
```
