# Halo 插件开发工具 (DevTools)

`run.halo.plugin.devtools` 是专为 Halo 插件开发者设计的 Gradle 插件，极大简化了插件的运行、调试和热重载流程。

## 1. 核心功能
*   **haloServer**: 自动拉取 Halo 镜像并以 Docker 容器形式启动服务，同时将当前插件加载为开发模式。
*   **热重载 (Reload)**: 无需重启整个 Halo 服务即可应用后端代码更改。
*   **自动监听 (Watch)**: 自动检测 `src/main/java` 和 `src/main/resources` 的变化并触发 `reload`。
*   **API 客户端生成**: 基于 OpenAPI 规范生成前端 TypeScript 客户端代码。
*   **角色模板生成**: 自动根据 API 定义生成 `roleTemplates.yaml`。

## 2. 常用命令
*   `./gradlew haloServer`: 启动 Halo 开发容器。
*   `./gradlew reload`: 手动触发插件热重载。
*   `./gradlew watch`: 开启自动重载模式（最推荐的开发方式）。
*   `./gradlew generateApiClient`: 生成前端 API 调用代码。
*   `./gradlew generateRoleTemplates`: 生成权限配置模板。

## 3. 配置选项 (build.gradle)
在 `halo {}` 块中可以自定义：
*   `version`: 使用的 Halo 核心版本。
*   `debug`: 是否开启远程调试端口 (默认 5005)。
*   `suspend`: 是否在启动时挂起等待调试器连接。
*   `adminInitializer`: 初始化管理员账号、密码和邮箱。

## 4. 前提条件
*   **Docker**: 必需，因为 `haloServer` 依赖容器化运行环境。
*   **Gradle**: 建议 8.3+。
