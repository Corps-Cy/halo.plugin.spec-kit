# Halo 插件扩展性设计 (Making Plugin Extensible)

不仅 Halo 核心是可扩展的，你的插件也可以定义自己的扩展点，允许其他插件来扩展你的功能。

## 1. 核心步骤

### 第一步：定义扩展接口
创建一个继承自 `org.pf4j.ExtensionPoint` 的接口。
```java
public interface MyPluginFeature extends ExtensionPoint {
    void execute(String param);
}
```
**建议**: 将此接口放在 `api` 模块中，方便其他插件引用。

### 第二步：声明扩展点定义 (`ExtensionPointDefinition`)
在 `src/main/resources/extensions/` 下定义 YAML。
```yaml
apiVersion: plugin.halo.run/v1alpha1
kind: ExtensionPointDefinition
metadata:
  name: my-plugin-feature
spec:
  className: "com.example.plugin.api.MyPluginFeature"
  displayName: "My Plugin Feature Extension"
  type: MULTI_INSTANCE # 或 SINGLE_INSTANCE
```

### 第三步：加载扩展实现
在你的插件代码中，使用 `ExtensionGetter` 来获取其他插件提供的实现。
```java
@Service
public class FeatureRunner {
    private final ExtensionGetter extensionGetter;

    // ...构造器注入

    public void runAll() {
        extensionGetter.getEnabledExtensions(MyPluginFeature.class)
            .forEach(feature -> feature.execute("test"));
    }
}
```

## 2. 其他插件如何接入？
1.  **引入依赖**: 引入你的 `api` 模块。
2.  **实现接口**: 实现 `MyPluginFeature` 接口，并标注 `@Component`。
3.  **声明实现**: 定义 `ExtensionDefinition` 指向你的 `my-plugin-feature`。

## 3. 关键机制
*   **标准化**: 整个流程与 Halo 核心扩展点的机制完全一致。
*   **PF4J 基础**: 底层基于 PF4J 的 ExtensionPoint 机制，但 Halo 提供了更高级的 `ExtensionGetter` 封装，使其与 Spring 上下文无缝集成。

## 4. 适用场景
*   **支付插件**: 定义 `PaymentProvider` 接口，允许其他插件接入微信、支付宝。
*   **导入导出**: 定义 `DataImporter` 接口，允许其他插件支持更多格式。
