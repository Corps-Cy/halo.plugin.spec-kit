# Halo UI 扩展点：页面数据列表操作菜单 (single-page:list-item:operation:create)

## 1. 扩展点 ID
`single-page:list-item:operation:create`

## 2. 用途
允许插件向自定义页面列表（管理后台 -> 内容 -> 页面）每一项的“操作”菜单中注入自定义项。其逻辑与文章列表操作菜单完全一致。

## 3. 核心接口 `OperationItem<ListedSinglePage>`
*   属性与 `post:list-item:operation:create` 相同。
*   回调函数收到的 `item` 为当前页面的数据对象。

## 4. 注册示例
```typescript
extensionPoints: {
  "single-page:list-item:operation:create": [
    {
      label: "复制页面 ID",
      action: (item) => {
        copyToClipboard(item.metadata.name);
      },
    },
  ],
}
```
