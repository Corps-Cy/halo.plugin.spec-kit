# Halo 服务端扩展点：Web 过滤器 (AdditionalWebFilter)

`AdditionalWebFilter` 允许插件在 Halo 的 WebFlux 请求处理链中插入自定义的过滤器。

## 1. 核心职能
*   **用途**: 拦截和处理 HTTP 请求/响应。
*   **场景**: 全局请求日志记录、添加自定义响应头、CORS 处理、特殊的安全校验等。

## 2. 实现步骤

### 第一步：实现 `WebFilter` 接口
在 WebFlux 中，标准的过滤器接口是 `org.springframework.web.server.WebFilter`。插件需要实现该接口，并作为一个 Spring Bean。

```java
@Component
public class MyCustomFilter implements WebFilter {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        // 逻辑：在请求处理前执行
        String path = exchange.getRequest().getURI().getPath();
        if (path.startsWith("/my-custom-path")) {
            // ...执行特定逻辑
        }
        
        // 继续调用链
        return chain.filter(exchange)
            .doOnSuccess(v -> {
                // 逻辑：在响应发送后执行
            });
    }
}
```

### 第二步：定义 `ExtensionDefinition`
告知 Halo 将此 Bean 作为一个额外的 Web 过滤器加载。

```yaml
apiVersion: plugin.halo.run/v1alpha1
kind: ExtensionDefinition
metadata:
  name: my-custom-filter
spec:
  extensionPointName: "web-filter"
  className: "myCustomFilter" # Spring Bean 名称
  displayName: "My Custom Web Filter"
```

## 3. 注意事项
*   **全异步**: 必须遵循 Reactor 的编程模型，严禁阻塞。
*   **顺序**: 过滤器的执行顺序可能难以精确控制，如果对顺序有强依赖，请谨慎使用或查阅 Halo 核心关于过滤器链的配置。
*   **全局生效**: 一旦启用，该过滤器会作用于所有的 Web 请求（除非在代码中手动判定路径），请注意性能影响。
