# Halo UI 扩展点：仪表盘扩展点 (console:dashboard:widgets:create)

## 1. 扩展点 ID
`console:dashboard:widgets:create`

## 2. 用途
允许插件向 Halo 管理后台的仪表盘注入自定义的小挂件（Widgets）。用户可以自由添加、排列和配置这些挂件。

## 3. 核心接口 `DashboardWidgetDefinition`
*   **`id`**: 挂件唯一 ID。
*   **`component`**: 挂件 Vue 组件。
*   **`group`**: 挂件分组名称（用于在挂件库中分类）。
*   **`configFormKitSchema`**: (可选) 定义挂件配置表单的 FormKit Schema。
*   **`defaultConfig`**: (可选) 挂件的默认配置。
*   **`defaultSize`**: 定义挂件的默认尺寸 (`w`, `h`) 及限制 (`minW`, `maxW` 等)。
*   **`permissions`**: 访问该挂件所需的权限。

## 4. 组件交互
挂件组件接收 `config` Prop，代表用户当前的挂件配置。

## 5. 注册示例
```typescript
extensionPoints: {
  "console:dashboard:widgets:create": () => [
    {
      id: "my-stats-widget",
      group: "统计",
      component: markRaw(MyStatsWidget),
      defaultSize: { w: 4, h: 2 },
      configFormKitSchema: [
        {
          $formkit: "text",
          name: "title",
          label: "标题",
        },
      ],
    },
  ],
}
```
命名的 ID 通常在内部实现时会映射为 `dashboard:widget:pushed` 或类似路径，但在 `definePlugin` 中应使用此官方 ID。
