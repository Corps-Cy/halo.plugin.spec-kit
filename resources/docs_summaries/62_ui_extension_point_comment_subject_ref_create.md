# Halo UI 扩展点：评论来源显示 (comment:subject-ref:create)

## 1. 扩展点 ID
`comment:subject-ref:create`

## 2. 用途
允许插件自定义管理后台评论列表中“来源主体”的显示方式。默认仅支持文章和页面，插件可以通过此扩展点让自定义模型（如：日记、书籍）的评论正确显示其标题和链接。

## 3. 核心接口 `CommentSubjectRefProvider`
*   **`group`**: 资源组。
*   **`kind`**: 资源种类。
*   **`resolve`**: 解析函数。输入为资源对象（Extension），输出为 `CommentSubjectRefResult`。

## 4. `CommentSubjectRefResult` 结构
*   **`label`**: 资源类型标签（如“日记”）。
*   **`title`**: 资源的标题（如日记的内容片段）。
*   **`route`**: (可选) 点击后跳转的控制台路由。
*   **`externalUrl`**: (可选) 点击后查看前台页面的链接。

## 5. 注册示例
```typescript
extensionPoints: {
  "comment:subject-ref:create": [
    {
      group: "moment.plugin.halo.run",
      kind: "Moment",
      resolve: (moment: any) => ({
        label: "日记",
        title: moment.spec.content,
        route: { name: "PluginMomentView" },
      }),
    },
  ],
}
```
