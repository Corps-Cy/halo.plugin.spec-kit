# Halo 插件依赖与交互 (Plugin Dependency & Interaction)

Halo 插件系统支持显式声明对其他插件的依赖，并提供了一套跨插件交互的机制。

## 1. 声明依赖 (`plugin.yaml`)
在插件描述文件 `plugin.yaml` 的 `spec.pluginDependencies` 字段中声明。

### 语法示例：
```yaml
spec:
  pluginDependencies:
    - pluginB: "1.0.0"             # 固定版本
    - pluginC: ">=1.0.0 & <2.0.0" # 版本范围
    - pluginD?: "1.0.0"            # 可选依赖 (带问号)
```

## 2. 依赖类型
*   **强制依赖 (Required)**: 默认情况。如果所依赖的插件未安装或版本不符合，当前插件将无法加载。
*   **可选依赖 (Optional)**: 使用 `?` 后缀声明。即便依赖插件缺失，当前插件仍能加载，但需在代码中自行判断功能是否可用。

## 3. 类与服务的跨插件访问
为了实现代码级的交互（如调用另一个插件的 Service），推荐采用“API 模块分离”模式。

### 推荐项目结构：
1.  **`api` 模块**: 存放共享的接口 (Interfaces) 和数据模型 (DTOs)。不包含具体实现。
2.  **`plugin` 模块**: 存放具体的业务实现 (Implementations)。

### 交互步骤：
1.  **发布 API**: 将 `api` 模块打成 JAR 包并发布到 Maven 仓库（如 GitHub Packages 或私服）。
2.  **引入依赖**: 在下游插件的 `build.gradle` 中通过 `implementation` 引入该 API JAR 包。
3.  **Spring 注入**: 只要上游插件提供了对应的 Spring Bean 实现，下游插件可以直接通过 `@Autowired` 或构造器注入接口。

## 4. 关键机制：类加载与隔离
*   **隔离性**: 默认情况下，插件间的类加载器是隔离的。
*   **共享**: 通过 `pluginDependencies` 声明后，Halo 会在运行时建立插件间的连接，允许下游插件访问上游插件导出的类（通常是 Spring 托管的 Bean）。

## 5. 最佳实践
*   **粒度控制**: 避免循环依赖（A 依赖 B，B 依赖 A）。
*   **版本约束**: 尽量使用明确的版本范围，防止上游插件重大更新导致下游崩溃。
*   **防御式编程**: 对于可选依赖，调用前使用 `pluginContext` 或检查 Bean 是否存在。
