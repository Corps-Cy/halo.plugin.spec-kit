# Halo 插件入门 (Hello World)

## 1. 创建项目
使用官方提供的脚手架工具进行交互式创建：
*   **命令**: `pnpm create halo-plugin`
*   **交互项**:
    *   `Plugin name`: 插件名称 (如 `hello-world`)。
    *   `Domain`: 包名 (如 `com.example`)。
    *   `Author name`: 作者名。
    *   `UI Build Tool`: 推荐 `Rsbuild` 或 `Vite`。

## 2. 项目结构 (核心文件)
*   **`plugin.yaml`**: 位于 `src/main/resources/`。定义插件元数据（名称、版本、依赖等）。
*   **入口类**: 位于 `src/main/java/.../`。通常是 `StarterPlugin.java`，需继承 `BasePlugin`。
*   **前端代码**: 位于 `ui/` 目录。

## 3. 开发环境运行 (两种方式)

### 方式 A：使用 DevTools (推荐)
*   **前提**: 已安装 Docker。
*   **命令**: `./gradlew haloServer`
*   **效果**: 自动创建并运行一个包含该插件的 Halo 容器。

### 方式 B：手动链接到 Halo 源码
1.  **构建插件**: `./gradlew build`。
2.  **配置本地 Halo**: 在 Halo 源码目录的 `application/src/main/resources` 创建 `application-local.yaml`。
3.  **指定插件路径**:
    ```yaml
    halo:
      plugin:
        runtime-mode: development
        fixed-plugin-path:
          - /path/to/your-plugin-root
    ```
4.  **启动 Halo**: `./gradlew bootRun --args="--spring.profiles.active=dev,local"`。

## 4. 验证插件
1.  登录 `http://localhost:8090/console`。
2.  在“插件”菜单中应看到 `hello-world`。
3.  左侧菜单栏应出现“示例分组”及“示例页面”，点击可查看插件注入的 UI。
