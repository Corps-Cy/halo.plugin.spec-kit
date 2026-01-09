# Halo 插件项目结构 (Plugin Project Structure)

Halo 插件项目采用了前后端分离的结构，后端基于 Java (Gradle)，前端基于 Vue 3 (Vite/Rsbuild)。

## 1. 根目录文件
*   **`build.gradle`**: 后端构建核心配置文件。
*   **`settings.gradle`**: Gradle 多项目/设置文件。
*   **`gradle.properties`**: 定义版本号、依赖版本等属性。
*   **`gradlew` / `gradlew.bat`**: Gradle Wrapper 脚本。

## 2. 后端源码 (`src/main/java`)
*   **路径**: `src/main/java/{package-path}/`
*   **核心类**: `StarterPlugin.java`
    *   **作用**: 插件入口类。
    *   **要求**: 必须继承 `run.halo.app.plugin.BasePlugin`。
    *   **生命周期**: 包含插件启动 (`start`) 和停止 (`stop`) 的逻辑。

## 3. 后端资源 (`src/main/resources`)
*   **`plugin.yaml`**: **【必须】** 插件描述文件，定义名称、版本、作者、依赖等。
*   **`resources/console`**: 前端构建产物（`.js`, `.css`）存放处。Halo 会加载此目录下的资源以渲染控制台扩展。

## 4. 前端源码 (`ui/`)
*   **`ui/src/index.ts`**: 前端入口文件。用于注册路由、菜单、扩展点等。
*   **`ui/src/views/`**: 存放 Vue 页面组件。
*   **`ui/src/components/`**: 存放复用组件。
*   **`ui/src/styles/`**: 样式文件。
*   **配置文件**: `package.json`, `vite.config.ts`, `tsconfig.json` 等（标准的 Vue 项目结构）。

## 5. 其他目录
*   **`gradle/`**: 存放 Gradle Wrapper 相关的 JAR 和属性文件。
