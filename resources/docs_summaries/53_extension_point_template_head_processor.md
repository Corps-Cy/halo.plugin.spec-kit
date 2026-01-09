# Halo 服务端扩展点：主题 Head 标签处理 (TemplateHeadProcessor)

`TemplateHeadProcessor` 允许插件在主题渲染前，向 HTML 的 `<head>` 标签中动态注入自定义内容（如 Meta 标签、外部脚本、样式表等）。

## 1. 核心职能
*   **用途**: 全局或条件性地向站点前台页面的头部注入资源。
*   **场景**: 注入网站统计代码（如百度统计、GA）、注入插件自定义的全局 CSS/JS、修改页面的 SEO Meta 信息。

## 2. 核心接口 `TemplateHeadProcessor`
插件需要实现该接口。

### 关键方法：
*   **`process(context, model)`**: 
    *   **逻辑**: 执行注入动作。
    *   `context`: 提供模板渲染上下文。
    *   `model`: 代表 `<head>` 内部的元素模型，支持添加、修改、删除标签。

## 3. 实现步骤

### 第一步：实现接口
```java
@Component
public class MySiteAnalyticsProcessor implements TemplateHeadProcessor {
    @Override
    public void process(ITemplateContext context, IModel model) {
        // 1. 创建一个自定义标签 (例如脚本)
        IStandaloneElementTag scriptTag = context.getElementTagFactory()
            .createStandaloneElementTag("script", Map.of(
                "src", "https://analytics.example.com/tracker.js",
                "async", "async"
            ), ValueQuotes.DOUBLE, false, true);

        // 2. 将标签添加到 Head 模型的末尾
        model.add(scriptTag);
    }
}
```

### 第二步：定义 `ExtensionDefinition`
```yaml
apiVersion: plugin.halo.run/v1alpha1
kind: ExtensionDefinition
metadata:
  name: site-analytics-processor
spec:
  extensionPointName: "template-head-processor"
  className: "mySiteAnalyticsProcessor"
  displayName: "网站统计注入器"
```

## 4. 关键点
*   **Thymeleaf 模型操作**: 使用 `context.getElementTagFactory()` 来创建标签，这保证了生成的 HTML 符合模板引擎规范。
*   **非侵入性**: 无需修改主题源码即可影响前台展示，且支持多个插件同时注入，它们会按照插件加载顺序依次执行。
*   **条件注入**: 可以通过 `context` 判断当前页面的路径或类型，从而决定是否注入（例如：只在文章详情页注入某个脚本）。

## 5. 适用场景
*   SEO 增强（动态生成 Canonical 标签）。
*   第三方分析与监控工具集成。
*   注入主题适配用的全局样式补丁。
*   管理控制台通过插件向预览页注入辅助代码。
