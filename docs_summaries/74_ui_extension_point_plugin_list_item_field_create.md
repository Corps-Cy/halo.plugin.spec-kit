# Halo UI 扩展点：插件数据列表显示字段 (plugin:list-item:field:create)

## 1. 扩展点 ID
`plugin:list-item:field:create`

## 2. 用途
允许插件向插件管理列表的表格中注入新的显示字段（列）。这常用于直观地展示插件的特定元数据（如：依赖版本、运行状态、自定义标签等）。

## 3. 核心接口 `EntityFieldItem`
*   **`priority`**: 排序优先级。
*   **`position`**: 插入位置（`start` 或 `end`）。
*   **`component`**: 用于渲染字段的 Vue 组件（推荐使用 `VEntityField`）。
*   **`props`**: 传递给组件的属性（通常包含 `description` 或 `title`）。

## 4. 注册示例
```typescript
extensionPoints: {
  "plugin:list-item:field:create": (plugin) => [
    {
      priority: 0,
      position: "end",
      component: markRaw(VEntityField),
      props: {
        description: plugin.value.spec.requires, // 显示依赖版本
      },
    },
  ],
}
```
