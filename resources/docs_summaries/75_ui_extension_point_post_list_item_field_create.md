# Halo UI 扩展点：文章数据列表显示字段 (post:list-item:field:create)

## 1. 扩展点 ID
`post:list-item:field:create`

## 2. 用途
允许插件向文章管理列表的表格中注入新的显示字段。可用于展示文章的额外信息，如：SEO 分数、阅读量、关联的插件数据等。

## 3. 核心接口 `EntityFieldItem`
*   属性与 `plugin:list-item:field:create` 相同。
*   注入函数接收 `Ref<ListedPost>`。

## 4. 注册示例
```typescript
extensionPoints: {
  "post:list-item:field:create": (post) => [
    {
      priority: 10,
      position: "end",
      component: markRaw(VEntityField),
      props: {
        description: post.value.post.spec.slug, // 在列表显示别名
      },
    },
  ],
}
```
