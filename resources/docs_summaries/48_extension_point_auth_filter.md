# Halo 服务端扩展点：认证安全过滤器 (AuthenticationWebFilter)

在之前的版本中，开发者通常使用通用的 `AdditionalWebFilter` 处理安全逻辑，但在 2.x 中，官方推荐使用专门的认证安全过滤器扩展点。

## 1. 核心职能
*   **用途**: 专门用于拦截认证请求，实现自定义的登录或身份核验逻辑。
*   **定位**: 它被集成在 Halo 的核心安全过滤链中，拥有明确的认证职责划分。

## 2. 三种专门的过滤器接口
根据业务场景的不同，需要实现不同的接口：

1.  **`FormLoginSecurityWebFilter`**:
    *   **场景**: 扩展或修改表单登录流程（通常拦截 `/login` 路径）。
2.  **`AuthenticationSecurityWebFilter`**:
    *   **场景**: 一般性的认证逻辑，如处理 Bearer Token、自定义头部认证等。
3.  **`AnonymousAuthenticationSecurityWebFilter`**:
    *   **场景**: 用于处理匿名访问时的安全策略。

## 3. 实现与注册
*   **接口**: 实现上述三个接口之一。
*   **注册**: 标注为 `@Component`。
*   **注意**: 即使作为扩展点，如果当前请求不符合你的认证条件，**务必调用 `chain.filter(exchange)`** 将控制权传递给链中的下一个过滤器。

## 4. 与 `AdditionalWebFilter` 的区别
*   `AdditionalWebFilter`: 通用性质，不建议再用于认证逻辑。
*   `AuthenticationWebFilter` 系列: 语义化更强，由 Halo 核心安全模块显式调度，稳定性更高。

## 5. 示例代码
```java
@Component
public class MyTokenFilter implements AuthenticationSecurityWebFilter {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        // 尝试从 Header 中获取自定义 Token
        String token = exchange.getRequest().getHeaders().getFirst("X-Custom-Token");
        
        if (isValid(token)) {
            // 设置认证信息逻辑...
        }
        
        // 关键：放行，让核心安全逻辑继续
        return chain.filter(exchange);
    }
}
```

## 6. 使用场景
*   **单点登录 (SSO) 客户端**: 拦截特定 URL 并与授权中心校验。
*   **API 密钥校验**: 为特定的 API 路径提供 Key 认证。
*   **JWT 扩展**: 实现自定义的 JWT 验证逻辑。
