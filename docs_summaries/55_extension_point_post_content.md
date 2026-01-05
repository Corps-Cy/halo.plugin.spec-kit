# Halo 服务端扩展点：文章内容处理 (PostContentProcessor)

`PostContentProcessor`（接口名为 `ReactivePostContentHandler`）允许插件在文章（Post）或页面（Page）内容渲染到主题前，对其进行拦截和修改。

## 1. 核心职能
*   **用途**: 动态修改文章正文内容。
*   **场景**: 
    *   在文章开头注入广告位。
    *   在文章末尾自动添加版权声明。
    *   自动将文章中的链接添加 `rel="nofollow"`。
    *   图片 CDN 链接替换或图片转码。
    *   实现复杂的文本过滤或关键字替换。

## 2. 核心接口 `ReactivePostContentHandler`
插件需要实现该接口。

### 关键方法：
*   **`handle(context)`**: 
    *   **入参**: `PostContentContext` 包含当前文章的元数据、原始内容以及已经经过其他处理器处理后的 HTML 内容。
    *   **逻辑**: 修改 `context` 中的内容（通常是 `content` 字段，即 HTML 内容）。
    *   **返回**: `Mono<PostContentContext>`。

## 3. 实现步骤

### 第一步：实现接口
```java
@Component
public class MyCopyrightHandler implements ReactivePostContentHandler {
    @Override
    public Mono<PostContentContext> handle(PostContentContext context) {
        String originalHtml = context.getContent();
        
        // 逻辑：在文章末尾追加版权信息
        String newHtml = originalHtml + "<div class='post-copyright'>© 本文版权归作者所有。</div>";
        
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
  name: my-copyright-handler
spec:
  extensionPointName: "reactive-post-content-handler"
  className: "myCopyrightHandler"
  displayName: "文章版权注入处理器"
```

## 4. 关键机制
*   **多实例 (`MULTI_INSTANCE`)**: 这是一个多实例扩展点。系统可以同时存在多个处理器，它们会形成一个处理链，按顺序依次对文章内容进行加工。
*   **不改动原数据**: 该处理发生在渲染层，**不会修改数据库中存储的文章原文**，仅影响用户在前台看到的最终 HTML。
*   **异步非阻塞**: 必须返回 `Mono`，适合在处理过程中调用异步 API（如调用敏感词检测接口）。

## 5. 适用场景
*   **图片优化**: 自动将文章内图片 URL 替换为 WebP 代理地址。
*   **引流/营销**: 自动在正文中间插入推荐文章链接。
*   **安全性**: 扫描并移除文章中的非法脚本或 XSS 风险代码。
