# Halo 服务端扩展点：评论组件 (CommentWidget)

`CommentWidget` 扩展点允许插件接管前台主题中 `<halo:comment />` 标签的渲染逻辑。通过这个扩展点，插件可以替换 Halo 默认的评论组件，接入如 Valine、Gitalk 或自定义的评论系统。

## 1. 核心职能
*   **用途**: 定义前台评论界面的 HTML 渲染方式和交互逻辑。
*   **特性**: 属于 `SINGLETON` (单例) 类型扩展点。这意味着系统全局只能有一个处于激活状态的评论组件实现。

## 2. 核心接口 `CommentWidget`
插件需要实现该接口。该接口通常与 Thymeleaf 模板引擎的方言（Dialect）逻辑紧密结合。

### 关键方法：
*   **`render(context, tag, structureHandler)`**: 
    *   **逻辑**: 这是渲染的核心。
    *   `context`: 提供模板上下文，可从中获取当前文章、设置等信息。
    *   `tag`: 代表模板中的 `<halo:comment />` 标签，可以读取其属性（如 `group`, `kind`, `name`）。
    *   `structureHandler`: 用于修改 DOM 结构，例如将标签替换为一段包含特定 JS 脚本的 HTML 片段。

## 3. 实现步骤

### 第一步：实现接口
```java
@Component
public class MyCustomCommentWidget implements CommentWidget {
    @Override
    public void render(ITemplateContext context, IProcessableElementTag tag, IElementTagStructureHandler structureHandler) {
        // 1. 获取当前评论主体的标识
        String group = tag.getAttributeValue("group");
        String kind = tag.getAttributeValue("kind");
        String name = tag.getAttributeValue("name");

        // 2. 生成一段 HTML 代码（如引入第三方评论库的容器和脚本）
        String html = String.format(
            "<div id='my-comment-v'></div>" +
            "<script src='https://cdn.example.com/comment.js'></script>" +
            "<script>initComment({target: '#my-comment-v', group: '%s', kind: '%s', name: '%s'});</script>",
            group, kind, name
        );

        // 3. 替换原有的 <halo:comment /> 标签
        structureHandler.replaceWith(html, false);
    }
}
```

### 第二步：定义 `ExtensionDefinition`
```yaml
apiVersion: plugin.halo.run/v1alpha1
kind: ExtensionDefinition
metadata:
  name: my-custom-comment-widget
spec:
  extensionPointName: "comment-widget"
  className: "myCustomCommentWidget"
  displayName: "My Custom Comment Widget"
```

## 4. 关键点
*   **单例冲突**: 由于是 `SINGLETON` 扩展点，如果用户同时安装并启用了两个评论插件，Halo 会根据规则（如加载顺序或用户手动指定）选择其中一个。
*   **参数传递**: 插件可以从 `context` 中读取配置（如通过 `SettingFetcher` 获取的 API Key），并将其注入到前端脚本中。

## 5. 适用场景
*   集成第三方评论系统（Disqus, Valine, Waline 等）。
*   开发完全自定义的、具备特殊交互逻辑（如：弹幕评论）的评论组件。
