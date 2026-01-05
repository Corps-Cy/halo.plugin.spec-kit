# Halo 2.x Plugin Development AI Specification Kit

![Halo](https://img.shields.io/badge/Halo-2.x-blue) ![License](https://img.shields.io/badge/License-MIT-green) ![Status](https://img.shields.io/badge/Status-Completed-success)

This project is a comprehensive **technical knowledge base and AI collaboration specification** designed specifically for **Halo 2.x plugin development**.

By deeply analyzing and structuring **91 core chapters** of the official Halo documentation, we have built a complete "digital brain". Whether referenced by human developers or fed as context to AI (ChatGPT, Claude, DeepSeek), it ensures the output of high-quality code that adheres to Halo's official best practices.

---

## 📂 Core Assets

This project contains two main parts:

1.  **AI Collaboration Specs (`ai_specs/`)**: Highly distilled prompt-level documents ready to be sent to AI.
2.  **Technical Knowledge Base (`docs_summaries/`)**: 91 detailed summaries covering every aspect of Halo development.

---

## 🚀 How to Use for New Plugin Development?

When you are ready to develop a new Halo plugin, follow these steps to turn your AI into a senior architect:

### Step 1: Inject Technical Soul
Copy the content of **[`ai_specs/00_master_spec.md`](ai_specs/00_master_spec.md)** and send it to the AI with the instruction:
> "This is the hard technical constraint for Halo 2.x plugin development. Please strictly follow this specification in our conversation, avoiding outdated MVC patterns or synchronous blocking code."

### Step 2: Inject Process Standards
Copy the content of **[`ai_specs/01_collaboration_manual.md`](ai_specs/01_collaboration_manual.md)** and send it to the AI:
> "This is our collaboration process manual. Please assist me in development following the 'Inception -> Requirements -> Breakdown -> Coding' flow."

### Step 3: Start Development
Tell the AI your idea:
> "I want to develop a 'Daily Check-in' plugin. Please help me breakdown the requirements and define the Extension resources."

---

## 📚 Knowledge Base Index

All technical summaries are located in the `docs_summaries/` directory.

### 1. Environment & Basics
| ID | Key Technical Point | Document |
| :--- | :--- | :--- |
| 01-03 | JDK 21, Node 20, Gradle Build | [01_prepare.md](docs_summaries/01_prepare.md), [02_run.md](docs_summaries/02_run.md), [03_build.md](docs_summaries/03_build.md) |
| 04 | **Architecture Overview (Extension/Reconciler)** | [04_framework.md](docs_summaries/04_framework.md) |
| 06-08 | Structure & Hello World | [06_plugin_prepare.md](docs_summaries/06_plugin_prepare.md), [07_plugin_hello_world.md](docs_summaries/07_plugin_hello_world.md), [08_plugin_structure.md](docs_summaries/08_plugin_structure.md) |
| 09 | **plugin.yaml Configuration** | [09_plugin_manifest.md](docs_summaries/09_plugin_manifest.md) |
| 10 | DevTools (Hot Reload/Debug) | [10_plugin_devtools.md](docs_summaries/10_plugin_devtools.md) |

### 2. Backend Core Development
| ID | Key Technical Point | Document |
| :--- | :--- | :--- |
| 17 | **Custom Model Definition (@GVK)** | [17_extension_definition.md](docs_summaries/17_extension_definition.md) |
| 18 | **Reconciler Logic** | [18_reconciler_writing.md](docs_summaries/18_reconciler_writing.md) |
| 19 | Reactive Client (ExtensionClient) | [19_extension_client.md](docs_summaries/19_extension_client.md) |
| 20 | Plugin Config (SettingFetcher) | [20_setting_fetcher.md](docs_summaries/20_setting_fetcher.md) |
| 11 | Lifecycle (Start/Stop) | [11_plugin_lifecycle.md](docs_summaries/11_plugin_lifecycle.md) |
| 12 | Spring Object Management | [12_object_management.md](docs_summaries/12_object_management.md) |
| 27 | Extension Getter | [27_extension_getter.md](docs_summaries/27_extension_getter.md) |

### 3. Frontend Development System
| ID | Key Technical Point | Document |
| :--- | :--- | :--- |
| 13-15 | UI Entry, definePlugin, Build | [13_plugin_ui_intro.md](docs_summaries/13_plugin_ui_intro.md) ... [15_plugin_ui_build.md](docs_summaries/15_plugin_ui_build.md) |
| 29 | **Route Definition (Routes & Menu)** | [29_plugin_ui_routes.md](docs_summaries/29_plugin_ui_routes.md) |
| 30 | API Request (@halo-dev/api-client) | [30_plugin_ui_api_request.md](docs_summaries/30_plugin_ui_api_request.md) |
| 31 | Shared Lib (Stores/Utils) | [31_plugin_ui_shared_lib.md](docs_summaries/31_plugin_ui_shared_lib.md) |
| 32-45 | **UI Components** | [32_plugin_ui_components.md](docs_summaries/32_plugin_ui_components.md) (Includes Upload, Filter, Modal, etc.) |

### 4. Server Extension Points
| ID | Extension Capability | Document |
| :--- | :--- | :--- |
| 47-48 | Web Filter & Auth Filter | [47_extension_point_web_filter.md](docs_summaries/47_extension_point_web_filter.md), [48_extension_point_auth_filter.md](docs_summaries/48_extension_point_auth_filter.md) |
| 49 | **Attachment Storage (OSS/S3)** | [49_extension_point_attachment_storage.md](docs_summaries/49_extension_point_attachment_storage.md) |
| 52 | **Notification (Notifier)** | [52_extension_point_notifier.md](docs_summaries/52_extension_point_notifier.md) |
| 53-56 | Theme Content Injection (Head/Footer/Post) | [53_template_head](docs_summaries/53_extension_point_template_head_processor.md), [55_post_content](docs_summaries/55_extension_point_post_content.md) |
| 57 | Custom Authentication (LDAP etc.) | [57_extension_point_auth_manager.md](docs_summaries/57_extension_point_auth_manager.md) |
| 23,24 | Finder & Theme Templates | [23_plugin_finder.md](docs_summaries/23_plugin_finder.md), [24_plugin_theme_templates.md](docs_summaries/24_plugin_theme_templates.md) |

### 5. UI Extension Points
| ID | Injection Location | Document |
| :--- | :--- | :--- |
| 59,61 | **Editor Extension** | [59_editor_create.md](docs_summaries/59_ui_extension_point_editor_create.md), [61_default_editor.md](docs_summaries/61_ui_extension_point_default_editor_extension_create.md) |
| 79 | **Dashboard Widgets** | [79_dashboard_widgets.md](docs_summaries/79_ui_extension_point_console_dashboard_widgets_create.md) |
| 66-73 | List Operations | [66_post_op.md](docs_summaries/66_ui_extension_point_post_list_item_operation_create.md) ... [73_theme_op.md](docs_summaries/73_ui_extension_point_theme_list_item_operation_create.md) |
| 74-76 | List Display Fields | [74_plugin_field.md](docs_summaries/74_ui_extension_point_plugin_list_item_field_create.md) ... |
| 60,77 | Detail Tabs | [60_plugin_tabs.md](docs_summaries/60_ui_extension_point_plugin_self_tabs_create.md), [77_user_tabs.md](docs_summaries/77_ui_extension_point_user_detail_tabs_create.md) |

### 6. Security, Interaction & Best Practices
| ID | Key Technical Point | Document |
| :--- | :--- | :--- |
| 83 | **Role Template** | [83_plugin_role_template.md](docs_summaries/83_plugin_role_template.md) |
| 84 | **UI Permission** | [84_plugin_ui_permission.md](docs_summaries/84_plugin_ui_permission.md) |
| 81 | Shared Events | [81_plugin_shared_events.md](docs_summaries/81_plugin_shared_events.md) |
| 87 | Form Schema | [87_form_schema.md](docs_summaries/87_form_schema.md) |
| 89 | **Todo List Best Practice** | [89_best_practice_todo_list.md](docs_summaries/89_best_practice_todo_list.md) |
| 91 | App Publishing | [91_publish_app.md](docs_summaries/91_publish_app.md) |

---

**Happy Coding with Halo & AI!**
