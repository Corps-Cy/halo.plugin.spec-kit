# Halo UI 扩展点：回复数据列表操作菜单 (reply:list-item:operation:create)

## 1. 扩展点 ID
`reply:list-item:operation:create`

## 2. 用途
允许插件向评论回复列表的操作菜单中注入自定义项。通常用于对评论的二级回复进行管理或处理。

## 3. 核心接口 `OperationItem<ListedReply>`
*   属性与 `comment:list-item:operation:create` 相同。
*   回调函数收到的 `item` 为当前回复的数据对象。

## 4. 注册示例
```typescript
extensionPoints: {
  "reply:list-item:operation:create": [
    {
      label: "记录回复内容",
      action: (item) => {
        console.log("回复内容:", item.spec.content);
      },
    },
  ],
}
```
