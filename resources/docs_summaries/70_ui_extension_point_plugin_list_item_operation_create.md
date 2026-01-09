# Halo UI 扩展点：插件数据列表操作菜单 (plugin:list-item:operation:create)

## 1. 扩展点 ID
`plugin:list-item:operation:create`

## 2. 用途
允许插件向插件管理列表（管理后台 -> 插件 -> 已安装）的操作菜单中注入自定义项。这常用于提供插件级的全局维护工具，如“重置插件所有配置”、“清理插件缓存”或直接跳转到该插件的应用商店详情页。

## 3. 核心接口 `OperationItem<Plugin>`
*   属性与上述操作菜单相同。
*   回调函数收到的 `item` 为当前插件的元数据对象。

## 4. 注册示例
```typescript
extensionPoints: {
  "plugin:list-item:operation:create": [
    {
      label: "查看更新日志",
      action: (item) => {
        window.open(item.spec.homepage + "/blob/main/CHANGELOG.md");
      },
    },
  ],
}
```
