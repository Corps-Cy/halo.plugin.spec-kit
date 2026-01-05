# Halo UI 扩展点：评论数据列表操作菜单 (comment:list-item:operation:create)

## 1. 扩展点 ID
`comment:list-item:operation:create`

## 2. 用途
允许插件向评论管理列表（管理后台 -> 内容 -> 评论）每一项的操作菜单中注入自定义项。这可用于实现评论审查、导出评论或触发自定义的自动化处理逻辑。

## 3. 核心接口 `OperationItem<ListedComment>`
*   属性与 `post:list-item:operation:create` 相同。
*   回调函数收到的 `item` 为当前评论的数据对象。

## 4. 注册示例
```typescript
extensionPoints: {
  "comment:list-item:operation:create": [
    {
      label: "记录 ID",
      action: (item) => {
        console.log("评论 ID:", item.metadata.name);
      },
    },
  ],
}
```
