# Halo UI 扩展点：插件详情选项卡 (plugin:self:tabs:create)

## 1. 扩展点 ID
`plugin:self:tabs:create`

## 2. 用途
允许插件向自身的详情页面（管理后台 -> 插件 -> 详情）添加自定义的标签页。这常用于提供比标准 `Setting` 表单更复杂的配置界面。

## 3. 核心接口 `PluginTab`
*   **`id`**: 标签页唯一 ID。
*   **`label`**: 标签页标题。
*   **`component`**: 面板 Vue 组件。
*   **`permissions`**: 可选，访问该标签页所需的权限。

## 4. 组件交互
注入的组件可以通过 `inject` 获取当前插件的对象：
```typescript
const plugin = inject<Ref<Plugin>>("plugin");
```

## 5. 注册示例
```typescript
extensionPoints: {
  "plugin:self:tabs:create": [
    {
      id: "advanced-settings",
      label: "高级配置",
      component: AdvancedSettingsPanel,
    },
  ],
}
```
