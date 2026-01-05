# Halo UI 扩展点：页面数据列表显示字段 (single-page:list-item:field:create)

## 1. 扩展点 ID
`single-page:list-item:field:create`

## 2. 用途
允许插件向自定义页面列表的表格中注入新的显示字段。逻辑与文章列表字段扩展一致。

## 3. 核心接口 `EntityFieldItem`
*   属性与上述字段扩展相同。
*   注入函数接收 `Ref<ListedSinglePage>`。

## 4. 注册示例
```typescript
extensionPoints: {
  "single-page:list-item:field:create": (singlePage) => [
    {
      priority: 5,
      position: "start",
      component: markRaw(VEntityField),
      props: {
        title: "页面标识",
        description: singlePage.value.page.metadata.name,
      },
    },
  ],
}
```
