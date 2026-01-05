# Halo 插件配置获取 (SettingFetcher)

`SettingFetcher` 是 Halo 提供的高级接口，用于插件在运行时安全、高效地获取其自定义配置。

## 1. 核心职能
*   **用途**: 获取通过插件设置表单（Setting Form）配置的数据。
*   **特性**: 自动缓存、自动刷新。当用户在后台修改配置并保存后，`SettingFetcher` 能自动感知并更新，无需手动处理逻辑。

## 2. 客户端类型
*   **`ReactiveSettingFetcher` (推荐)**: 响应式版本，返回 `Mono<T>`。
*   **`SettingFetcher`**: 阻塞式版本。

## 3. 使用步骤

### 第一步：在 `plugin.yaml` 中声明
必须配置 `settingName` 和 `configMapName`，否则无法关联配置。
```yaml
spec:
  settingName: my-plugin-setting
  configMapName: my-plugin-configmap
```

### 第二步：定义配置模型
通常使用 Java **Record** 来定义配置类，其字段名称必须与设置表单中的 `name` 严格对应。
```java
public record MyPluginSetting(
    boolean enableFeature,
    String apiKey,
    @DefaultValue("10") int timeout
) {
    public static final String GROUP = "base-settings"; // 对应表单中的 group
}
```

### 第三步：获取配置
```java
@Service
public class MyService {
    private final ReactiveSettingFetcher settingFetcher;

    public MyService(ReactiveSettingFetcher settingFetcher) {
        this.settingFetcher = settingFetcher;
    }

    public Mono<Void> process() {
        return settingFetcher.fetch(MyPluginSetting.GROUP, MyPluginSetting.class)
            .flatMap(setting -> {
                if (setting.enableFeature()) {
                    // 业务逻辑...
                }
                return Mono.empty();
            });
    }
}
```

## 4. 与 `OptionService` 的区别
*   **`OptionService`**: 用于获取 Halo 系统全局选项（如站点标题、站长信息等）。
*   **`SettingFetcher`**: 专用于获取**当前插件**通过 `Setting` 资源定义的个性化配置。

## 5. 注意事项
*   **类型安全**: 获取到的配置对象是强类型的。
*   **默认值**: 如果用户尚未配置，`SettingFetcher` 会根据表单定义中的默认值或 Java 类的默认构造函数/字段值返回一个对象，而不是直接返回 `null`（通常返回空的 `Mono` 或默认对象，视具体实现而定）。
