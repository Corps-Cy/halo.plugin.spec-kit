# Halo 插件 UI 构建 (UI Build)

Halo 插件的前端构建流程旨在将 Vue 项目编译为 Halo 核心能够识别并加载的静态资源。

## 1. 构建工具
*   **推荐工具**: Vite 或 Rsbuild。
*   **辅助库**: 使用官方提供的 `@halo-dev/ui-plugin-bundler-kit` 进行预配置，简化了打包逻辑。

## 2. 关键脚本 (package.json)
*   **`pnpm dev`**: 
    *   以开发模式运行并开启监听 (`--watch`)。
    *   它会将代码实时编译到指定的临时目录，配合 Gradle 的 `watch` 任务实现前后端联合热更新。
*   **`pnpm build`**: 
    *   生产环境构建。生成高度优化、混淆压缩后的代码。

## 3. 构建产物与路径
*   **临时产物路径**: 通常位于 `ui/build/dist/`。
*   **最终集成路径**: 后端 Gradle 构建任务会自动将 `ui/build/dist/` 下的内容拷贝到 `src/main/resources/console/`。
*   **Jar 包结构**: 当插件打包为 `.jar` 时，前端资源会位于 `console/` 目录下。

## 4. 配置文件
*   **`vite.config.ts` 或 `rsbuild.config.ts`**: 
    *   可以通过官方提供的插件进行扩展。
    *   主要配置项包括环境变量、外部化依赖 (Externals) 等。
    *   **Externals**: 为了减小插件体积并提高性能，一些通用的库（如 `vue`, `vue-router`, `@halo-dev/console-shared`）通常会被配置为外部依赖，由 Halo 核心统一提供。

## 5. 后端配置
*   后端插件通过 `plugin.yaml` 和 `BasePlugin` 的加载机制，自动扫描 `src/main/resources/console` 目录下的 `main.js` 和 `style.css` (或其它入口文件) 并在管理后台加载。
