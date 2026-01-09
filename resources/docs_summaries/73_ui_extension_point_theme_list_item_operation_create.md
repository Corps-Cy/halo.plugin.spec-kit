# Halo UI 扩展点：主题数据列表操作菜单 (theme:list-item:operation:create)

## 1. 扩展点 ID
`theme:list-item:operation:create`

## 2. 用途
允许插件向主题列表（管理后台 -> 外观 -> 主题）的操作菜单中注入自定义项。常用于实现针对特定主题的处理逻辑，如“预览主题”、“导出主题配置”等。

## 3. 核心接口 `OperationItem<Theme>`
*   属性与上述操作菜单相同。
*   回调函数收到的 `item` 为当前主题的数据对象。

## 4. 注册示例
```typescript
extensionPoints: {
  "theme:list-item:operation:create": (theme) => [
    {
      label: "预览主题",
      action: (item) => {
        window.open(`/?preview-theme=${item.metadata.name}`);
      },
      priority: 10,
    },
  ],
}
```
