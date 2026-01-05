# Halo 服务端扩展点：自定义页面内容处理 (SinglePageContentProcessor)

`SinglePageContentProcessor`（接口名为 `ReactiveSinglePageContentHandler`）允许插件在自定义页面（SinglePage）渲染到主题前，对其内容进行拦截和修改。

## 1. 核心职能
*   **用途**: 动态修改自定义页面（如“关于我”、“留言板”等独立页面）的正文内容。
*   **与 PostContentProcessor 的区别**: 
    *   `PostContentProcessor`: 专门处理 **文章 (Post)** 的内容。
    *   `SinglePageContentProcessor`: 专门处理 **页面 (SinglePage)** 的内容。
    两者接口结构完全一致，但作用的资源类型不同。

## 2. 核心接口 `ReactiveSinglePageContentHandler`
插件需要实现该接口。

### 关键方法：
*   **`handle(context)`**: 
    *   **入参**: `SinglePageContentContext` 包含当前页面的元数据、原始内容以及已经经过其他处理器处理后的 HTML 内容。
    *   **逻辑**: 修改 `context` 中的 `content` 字段。
    *   **返回**: `Mono<SinglePageContentContext>`。

## 3. 实现步骤

### 第一步：实现接口
```java
@Component
public class MyPageAdHandler implements ReactiveSinglePageContentHandler {
    @Override
    public Mono<SinglePageContentContext> handle(SinglePageContentContext context) {
        String originalHtml = context.getContent();
        
        // 逻辑：在页面底部注入一个联系方式组件
        String newHtml = originalHtml + "<div class='page-contact'>联系我：admin@example.com</div>";
        
        // 返回更新后的上下文
        return Mono.just(context.toBuilder().content(newHtml).build());
    }
}
```

### 第二步：定义 `ExtensionDefinition`
```yaml
apiVersion: plugin.halo.run/v1alpha1
kind: ExtensionDefinition
metadata:
  name: my-page-ad-handler
spec:
  extensionPointName: "reactive-singlepage-content-handler"
  className: "myPageAdHandler"
  displayName: "页面底部联系方式注入器"
```

## 4. 关键机制
*   **多实例处理链**: 支持多个处理器按顺序对页面内容进行加工。
*   **按需处理**: 可以通过 `context.getSinglePage()` 获取页面的元数据（如名称、标签），从而决定是否对特定页面执行修改。
*   **全异步**: 保持 Halo 2.x 的高性能非阻塞特性。

## 5. 适用场景
*   为特定的自定义页面自动注入侧边栏或导航组件。
*   在特定页面开启或关闭某些脚本功能。
*   对页面内容进行全局的敏感词过滤或格式优化。
