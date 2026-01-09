# Halo UI 扩展点：备份页面选项卡 (backup:tabs:create)

## 1. 扩展点 ID
`backup:tabs:create`

## 2. 用途
允许插件向系统的“备份”页面（管理后台 -> 系统 -> 备份）添加自定义标签页。这通常用于提供更高级的备份功能，如“定时备份设置”或“备份到第三方云存储（S3, OSS）”。

## 3. 核心接口 `BackupTab`
*   **`id`**: 标签页 ID。
*   **`label`**: 标签页标题。
*   **`component`**: 面板 Vue 组件。
*   **`permissions`**: 访问所需的权限。

## 4. 注册示例
```typescript
extensionPoints: {
  "backup:tabs:create": [
    {
      id: "s3-backup-settings",
      label: "云端备份",
      component: S3BackupPanel,
    },
  ],
}
```
