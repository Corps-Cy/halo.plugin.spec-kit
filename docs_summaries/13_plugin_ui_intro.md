# Halo 插件 UI 开发介绍 (UI Development Intro)

Halo 插件的 UI 部分主要用于扩展 Halo 的管理后台 (Console) 和个人中心 (UC)。

## 1. 核心定位
*   **Console 扩展**: 允许插件向 Halo 的管理界面注入新的菜单、路由和页面。
*   **UC 扩展**: 允许插件在用户个人中心增加功能。

## 2. 技术栈
*   **框架**: Vue 3 (Composition API)
*   **语言**: TypeScript
*   **构建工具**: Vite 或 Rsbuild (由 `pnpm create halo-plugin` 初始化时选择)
*   **包管理**: pnpm (推荐版本 10+)
*   **环境**: Node.js 20+

## 3. UI 注入方式
插件通过在前端代码中调用 Halo 提供的 SDK，可以将 UI 注入到不同的位置：
*   **View (视图)**: 定义完整的页面，通常会关联一个路由。
*   **Component (组件)**: 定义 UI 片段。
*   **Extension Points (扩展点)**: Halo 核心或其它插件预留的位置，允许插件插入自己的组件（例如：文章编辑器的侧边栏、系统设置的选项卡等）。

## 4. 前后端集成
*   **目录结构**: 前端源码位于插件根目录的 `ui/` 下。
*   **编译与发布**: 前端代码经过编译打包后，产物会被放置在后端的 `src/main/resources/console` (或 `ui`) 目录下。
*   **加载机制**: 当 Halo 启动并加载该插件时，会自动识别并加载这些静态资源，并将其注入到 Console 的单页应用 (SPA) 中。

## 5. 开发建议
*   保持视觉风格一致：建议使用 Halo 官方提供的 UI 组件库和样式工具（如 Tailwind CSS / UnoCSS）。
*   模块化开发：将复杂的页面拆分为独立的组件，利用 TypeScript 提供类型安全。
