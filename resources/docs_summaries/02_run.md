# Halo 开发环境运行 (Run)

## 后端启动
1.  **Gradle 命令**:
    *   macOS / Linux: `./gradlew bootRun --args="--spring.profiles.active=dev"`
    *   Windows: `gradlew.bat bootRun --args="--spring.profiles.active=dev,win"`
2.  **插件预设 (可选)**:
    *   可以通过命令下载预设插件: `./gradlew downloadPluginPresets`。

## 前端启动 (UI 开发)
1.  **准备阶段**:
    *   进入 `ui` 目录。
    *   执行 `pnpm install` 安装依赖。
    *   执行 `pnpm build:packages` 构建公共包。
2.  **运行**:
    *   执行 `pnpm dev` 启动前端开发服务器。
    *   **注意**: 即使前端在 3000 (Console) 或 4000 (UC) 端口运行，开发时也应通过后端代理地址访问。

## 访问地址
*   **Halo 主站**: `http://localhost:8090`
*   **管理后台 (Console)**: `http://localhost:8090/console`
*   **个人中心 (UC)**: `http://localhost:8090/uc`

## 关键点
*   **激活 Profile**: 必须指定 `dev` profile 以启用开发模式下的代理和 H2 数据库。
*   **IDE 设置**: 在 IntelliJ IDEA 中，可以在 Run/Debug Configuration 的 `Active Profiles` 中填写 `dev`。
