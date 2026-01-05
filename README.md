# Halo 2.x 插件开发 AI 规范套件 (Halo Plugin Dev Spec Kit)

![Halo](https://img.shields.io/badge/Halo-2.x-blue) ![License](https://img.shields.io/badge/License-MIT-green) ![Status](https://img.shields.io/badge/Status-Completed-success)

本项目是一个专门针对 **Halo 2.x 插件开发** 构建的深度技术知识库与 AI 协作规范集合。

通过对 Halo 官方文档的 **91 个核心章节** 进行深度研读与结构化整理，我们构建了一套完整的“数字大脑”。无论是人类开发者查阅，还是作为 Context 投喂给 AI (ChatGPT, Claude, DeepSeek)，都能确保产出符合 Halo 官方最佳实践的高质量代码。

---

## 📂 核心资源

本项目包含两部分核心资产：

1.  **AI 协作规范 (`ai_specs/`)**: 经过高度提炼的 Prompt 级文档，可直接发送给 AI。
2.  **技术知识库 (`docs_summaries/`)**: 91 篇详细的技术点总结，覆盖了 Halo 开发的方方面面。

---

## 🚀 如何使用本规范开发新插件？

当你准备开发一个新的 Halo 插件时，请按照以下步骤操作，让 AI 成为你的资深架构师：

### 第一步：注入技术灵魂
复制 **[`ai_specs/00_master_spec.md`](ai_specs/00_master_spec.md)** 的全部内容，发送给 AI，并附带指令：
> “这是 Halo 2.x 插件开发的技术硬性约束，请在接下来的对话中严格遵守此规范，禁止使用过时的 MVC 模式或同步阻塞代码。”

### 第二步：注入流程规范
复制 **[`ai_specs/01_collaboration_manual.md`](ai_specs/01_collaboration_manual.md)** 的全部内容，发送给 AI：
> “这是我们的协作流程手册。请按照‘立项 -> 提需 -> 拆解 -> 编码’的流程辅助我开发。”

### 第三步：开始开发
告诉 AI 你的想法：
> “我想开发一个‘每日签到’插件，请帮我进行需求拆解和 Extension 资源定义。”

---

## 📚 知识库索引 (Knowledge Base Index)

所有技术总结均位于 `docs_summaries/` 目录下。

### 1. 环境搭建与项目基础 (Basics)
| ID | 关键技术点 | 对应文档 |
| :--- | :--- | :--- |
| 01-03 | JDK 21, Node 20, Gradle 构建 | [01_prepare.md](docs_summaries/01_prepare.md), [02_run.md](docs_summaries/02_run.md), [03_build.md](docs_summaries/03_build.md) |
| 04 | **架构概览 (Extension/Reconciler)** | [04_framework.md](docs_summaries/04_framework.md) |
| 06-08 | 项目结构与 Hello World | [06_plugin_prepare.md](docs_summaries/06_plugin_prepare.md), [07_plugin_hello_world.md](docs_summaries/07_plugin_hello_world.md), [08_plugin_structure.md](docs_summaries/08_plugin_structure.md) |
| 09 | **plugin.yaml 配置详解** | [09_plugin_manifest.md](docs_summaries/09_plugin_manifest.md) |
| 10 | DevTools (热重载/调试) | [10_plugin_devtools.md](docs_summaries/10_plugin_devtools.md) |

### 2. 后端核心开发 (Backend Core)
| ID | 关键技术点 | 对应文档 |
| :--- | :--- | :--- |
| 17 | **自定义模型定义 (@GVK)** | [17_extension_definition.md](docs_summaries/17_extension_definition.md) |
| 18 | **协调器逻辑 (Reconciler)** | [18_reconciler_writing.md](docs_summaries/18_reconciler_writing.md) |
| 19 | 响应式客户端 (ExtensionClient) | [19_extension_client.md](docs_summaries/19_extension_client.md) |
| 20 | 插件配置读取 (SettingFetcher) | [20_setting_fetcher.md](docs_summaries/20_setting_fetcher.md) |
| 11 | 生命周期 (Start/Stop) | [11_plugin_lifecycle.md](docs_summaries/11_plugin_lifecycle.md) |
| 12 | Spring 对象管理与注入 | [12_object_management.md](docs_summaries/12_object_management.md) |
| 27 | 扩展功能获取 (ExtensionGetter) | [27_extension_getter.md](docs_summaries/27_extension_getter.md) |

### 3. 前端开发体系 (Frontend System)
| ID | 关键技术点 | 对应文档 |
| :--- | :--- | :--- |
| 13-15 | UI 入口, definePlugin, 构建 | [13_plugin_ui_intro.md](docs_summaries/13_plugin_ui_intro.md) ... [15_plugin_ui_build.md](docs_summaries/15_plugin_ui_build.md) |
| 29 | **路由定义 (Routes & Menu)** | [29_plugin_ui_routes.md](docs_summaries/29_plugin_ui_routes.md) |
| 30 | API 请求封装 (@halo-dev/api-client) | [30_plugin_ui_api_request.md](docs_summaries/30_plugin_ui_api_request.md) |
| 31 | 共享库 (Stores/Utils) | [31_plugin_ui_shared_lib.md](docs_summaries/31_plugin_ui_shared_lib.md) |
| 32-45 | **UI 组件库 (Components)** | [32_plugin_ui_components.md](docs_summaries/32_plugin_ui_components.md) (含 Upload, Filter, Modal 等 10+ 组件详情) |

### 4. 服务端扩展点 (Server Extension Points)
| ID | 扩展能力 | 对应文档 |
| :--- | :--- | :--- |
| 47-48 | Web 过滤器 & 认证拦截 | [47_extension_point_web_filter.md](docs_summaries/47_extension_point_web_filter.md), [48_extension_point_auth_filter.md](docs_summaries/48_extension_point_auth_filter.md) |
| 49 | **附件存储 (OSS/S3)** | [49_extension_point_attachment_storage.md](docs_summaries/49_extension_point_attachment_storage.md) |
| 52 | **消息通知 (Notifier)** | [52_extension_point_notifier.md](docs_summaries/52_extension_point_notifier.md) |
| 53-56 | 主题内容注入 (Head/Footer/Post) | [53_template_head](docs_summaries/53_extension_point_template_head_processor.md), [55_post_content](docs_summaries/55_extension_point_post_content.md) |
| 57 | 自定义登录认证 (LDAP等) | [57_extension_point_auth_manager.md](docs_summaries/57_extension_point_auth_manager.md) |
| 23,24 | Finder 数据提供 & 模板回退 | [23_plugin_finder.md](docs_summaries/23_plugin_finder.md), [24_plugin_theme_templates.md](docs_summaries/24_plugin_theme_templates.md) |

### 5. UI 扩展点 (UI Extension Points)
| ID | 注入位置 | 对应文档 |
| :--- | :--- | :--- |
| 59,61 | **编辑器扩展 (Editor)** | [59_editor_create.md](docs_summaries/59_ui_extension_point_editor_create.md), [61_default_editor.md](docs_summaries/61_ui_extension_point_default_editor_extension_create.md) |
| 79 | **仪表盘挂件 (Dashboard)** | [79_dashboard_widgets.md](docs_summaries/79_ui_extension_point_console_dashboard_widgets_create.md) |
| 66-73 | 列表操作菜单 (List Operations) | [66_post_op.md](docs_summaries/66_ui_extension_point_post_list_item_operation_create.md) ... [73_theme_op.md](docs_summaries/73_ui_extension_point_theme_list_item_operation_create.md) |
| 74-76 | 列表显示字段 (List Fields) | [74_plugin_field.md](docs_summaries/74_ui_extension_point_plugin_list_item_field_create.md) ... |
| 60,77 | 详情页 Tab (Tabs) | [60_plugin_tabs.md](docs_summaries/60_ui_extension_point_plugin_self_tabs_create.md), [77_user_tabs.md](docs_summaries/77_ui_extension_point_user_detail_tabs_create.md) |

### 6. 安全、交互与最佳实践
| ID | 关键技术点 | 对应文档 |
| :--- | :--- | :--- |
| 83 | **角色模板 (Role Template)** | [83_plugin_role_template.md](docs_summaries/83_plugin_role_template.md) |
| 84 | **UI 权限控制** | [84_plugin_ui_permission.md](docs_summaries/84_plugin_ui_permission.md) |
| 81 | 跨插件事件共享 | [81_plugin_shared_events.md](docs_summaries/81_plugin_shared_events.md) |
| 87 | 表单定义 (Form Schema) | [87_form_schema.md](docs_summaries/87_form_schema.md) |
| 89 | **Todo List 完整实战** | [89_best_practice_todo_list.md](docs_summaries/89_best_practice_todo_list.md) |
| 91 | 应用发布规范 | [91_publish_app.md](docs_summaries/91_publish_app.md) |

---

**Happy Coding with Halo & AI!**