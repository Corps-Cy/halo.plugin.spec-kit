# Halo 插件提供主题模板 (Templates for Theme)

插件可以为其自定义的功能提供默认的主题模板（Thymeleaf），并允许主题开发者对其进行覆盖和适配。

## 1. 核心机制
Halo 采用 **“约定优于配置”** 和 **“回退机制”** 来处理插件模板：
1.  **主题优先**: 插件定义一个模板名称（如 `moments`），如果当前使用的主题包含该模板文件（如 `templates/moments.html`），则优先使用主题的。
2.  **插件回退**: 如果主题未定义，则自动使用插件内部提供的默认模板。

## 2. 模板存放路径
*   **默认模板**: 存放于插件的 `src/main/resources/templates/` 目录下。
*   **公共片段**: 存放于 `src/main/resources/templates/fragments/` 目录下。

## 3. 开发步骤

### 第一步：编写 Thymeleaf 模板
在 `src/main/resources/templates/my-page.html` 编写 HTML。

### 第二步：在代码中解析并渲染模板
注入 `TemplateNameResolver`，它负责处理上述的“回退机制”。

```java
@Component
public class MyRouter {
    private final TemplateNameResolver templateNameResolver;

    public MyRouter(TemplateNameResolver templateNameResolver) {
        this.templateNameResolver = templateNameResolver;
    }

    public RouterFunction<ServerResponse> routes() {
        return RouterFunctions.route()
            .GET("/my-custom-page", this::handleRequest)
            .build();
    }

    private Mono<ServerResponse> handleRequest(ServerRequest request) {
        Map<String, Object> model = new HashMap<>();
        model.put("data", "Hello from Plugin");

        // 解析模板名称：优先看主题有没有 "my-page.html"，没有就用插件自带的
        return templateNameResolver.resolveTemplateNameOrDefault(request.exchange(), "my-page")
            .flatMap(templateName -> ServerResponse.ok().render(templateName, model));
    }
}
```

## 4. 引用插件内的片段 (Fragments)
如果要在模板中引用本插件或其他插件的片段，必须使用特殊的 `plugin:` 前缀：
```html
<div th:replace="~{plugin:my-plugin-name:fragments/layout :: head}"></div>
```
*   格式: `~{plugin:<plugin-name>:<path-to-fragment> :: <fragment-name>}`

## 5. 适用场景
*   **自定义内容类型列表页**: 如日记 (Moments)、友情链接 (Links) 的前台展示。
*   **搜索结果页扩展**: 插件提供的特定搜索结果展示。
*   **独立的动态页面**: 如插件生成的报表或统计页面。
