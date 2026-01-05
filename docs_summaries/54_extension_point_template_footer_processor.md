# Halo 服务端扩展点：主题 Footer 处理 (TemplateFooterProcessor)

`TemplateFooterProcessor` 允许插件在主题渲染前，向 `<halo:footer />` 标签所在位置注入自定义内容。

## 1. 核心职能
*   **用途**: 向站点底部（Footer）区域注入 HTML 片段。
*   **关联标签**: 对应主题模板中的 `<halo:footer />` 标签。
*   **场景**: 注入版权信息、备案号、统计代码、即时聊天窗口脚本（通常放在页面底部）等。

## 2. 核心接口 `TemplateFooterProcessor`
插件需要实现该接口。

### 关键方法：
*   **`process(context, tag, structureHandler, model)`**: 
    *   **逻辑**: 修改 Footer 区域的渲染模型。
    *   `tag`: 代表模板中的 `<halo:footer />` 标签。
    *   `structureHandler`: 用于修改标签结构（如替换标签）。
    *   `model`: 底部内容的元素模型。

## 3. 实现步骤

### 第一步：实现接口
```java
@Component
public class MyCopyrightProcessor implements TemplateFooterProcessor {
    @Override
    public void process(ITemplateContext context, IProcessableElementTag tag, 
                        IElementTagStructureHandler structureHandler, IModel model) {
        
        // 创建一个包含版权信息的 div
        IStandaloneElementTag divTag = context.getElementTagFactory()
            .createStandaloneElementTag("div", Map.of("class", "plugin-copyright"), ValueQuotes.DOUBLE, false, true);
        
        // 创建文本内容
        IText copyrightText = context.getElementTagFactory().createText("© 2026 My Awesome Plugin");

        // 将内容添加到底部模型中
        model.add(divTag);
        model.add(copyrightText);
    }
}
```

### 第二步：定义 `ExtensionDefinition`
```yaml
apiVersion: plugin.halo.run/v1alpha1
kind: ExtensionDefinition
metadata:
  name: my-copyright-processor
spec:
  extensionPointName: "template-footer-processor"
  className: "myCopyrightProcessor"
  displayName: "版权信息注入器"
```

## 4. 关键点
*   **与 HeadProcessor 的区别**: `HeadProcessor` 作用于 HTML 的 `<head>` 标签；`FooterProcessor` 作用于主题开发者在模板中显式声明的 `<halo:footer />` 区域。
*   **灵活控制**: 可以根据 `context` 中的变量（如当前用户、当前主题设置）来动态生成不同的底部内容。
*   **顺序执行**: 支持多个插件同时注入，按照插件加载顺序渲染。

## 5. 适用场景
*   展示站点运行时间统计。
*   注入即时通讯工具（如 Crisp, LiveChat）的挂载脚本。
*   自动注入插件的版本号或开发者链接。
