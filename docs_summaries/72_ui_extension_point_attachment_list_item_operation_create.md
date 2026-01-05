# Halo UI 扩展点：附件数据列表操作菜单 (attachment:list-item:operation:create)

## 1. 扩展点 ID
`attachment:list-item:operation:create`

## 2. 用途
允许插件向附件列表（管理后台 -> 内容 -> 附件）的操作菜单中注入自定义项。这常用于实现针对单个附件的处理逻辑（如：生成图片缩略图、将附件同步至图床、图片文字识别等）。

## 3. 核心接口 `OperationItem<Attachment>`
*   属性与上述操作菜单相同。
*   回调函数收到的 `item` 为当前附件的数据对象。

## 4. 注册示例
```typescript
extensionPoints: {
  "attachment:list-item:operation:create": [
    {
      label: "生成永久直链",
      action: (item) => {
        copyToClipboard(item.status.permalink);
      },
    },
  ],
}
```
