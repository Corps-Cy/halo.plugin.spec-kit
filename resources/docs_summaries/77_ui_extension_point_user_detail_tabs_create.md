# Halo UI 扩展点：用户详情选项卡 (user:detail:tabs:create)

## 1. 扩展点 ID
`user:detail:tabs:create`

## 2. 用途
允许插件向用户详情页面（管理后台 -> 用户 -> 用户列表 -> 点击用户进入详情）添加自定义标签页。这通常用于展示该用户的业务数据（如：该用户的消费记录、投稿记录、插件专属权限等）。

## 3. 核心接口 `UserTab`
*   **`id`**: 标签页 ID。
*   **`label`**: 标签页标题。
*   **`component`**: 面板 Vue 组件。
*   **`priority`**: 排序权重。

## 4. 组件交互
注入的组件会自动接收 `user: DetailedUser` 属性，代表当前正在查看的用户对象。

## 5. 注册示例
```typescript
extensionPoints: {
  "user:detail:tabs:create": () => [
    {
      id: "user-task-stats",
      label: "任务统计",
      component: markRaw(UserTaskStatsPanel),
    },
  ],
}
```
