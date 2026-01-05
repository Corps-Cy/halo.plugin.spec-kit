# Halo UI 扩展点：备份数据列表操作菜单 (backup:list-item:operation:create)

## 1. 扩展点 ID
`backup:list-item:operation:create`

## 2. 用途
允许插件向备份列表（管理后台 -> 系统 -> 备份）的操作菜单中注入自定义项。可用于实现备份包的特殊处理，例如“上传到云盘”、“校验备份包完整性”等。

## 3. 核心接口 `OperationItem<Backup>`
*   属性与上述操作菜单相同。
*   回调函数收到的 `item` 为当前备份记录的对象。

## 4. 注册示例
```typescript
extensionPoints: {
  "backup:list-item:operation:create": [
    {
      label: "校验 MD5",
      action: (item) => {
        // 执行校验逻辑...
      },
    },
  ],
}
```
