# Halo UI 扩展点：个人资料选项卡 (uc:user:profile:tabs:create)

## 1. 扩展点 ID
`uc:user:profile:tabs:create`

## 2. 用途
允许插件向个人中心 (User Center) 的个人资料页面添加自定义标签页。这是插件为前端用户提供个性化配置或展示用户数据的主要入口。

## 3. 核心接口 `UserProfileTab`
*   **`id`**: 标签页 ID。
*   **`label`**: 标签页标题。
*   **`component`**: 面板 Vue 组件。
*   **`priority`**: 排序权重。

## 4. 组件交互
注入的组件会自动接收 `user: DetailedUser` 属性，代表当前登录的用户。

## 5. 注册示例
```typescript
extensionPoints: {
  "uc:user:profile:tabs:create": () => [
    {
      id: "my-preferences",
      label: "插件偏好设置",
      component: markRaw(MyPreferencePanel),
    },
  ],
}
```
