# Halo 开发环境准备 (Preparation)

## 核心环境要求
1.  **JDK**: OpenJDK 21 LTS (注意：不再是 JDK 17)
    *   推荐发行版: Eclipse Temurin, Amazon Corretto, Azul Zulu 等。
2.  **Node.js**: 版本 20 LTS
    *   前端构建必需。
3.  **包管理器**: pnpm 10
    *   用于管理前端依赖。

## 开发工具
1.  **IDE**: IntelliJ IDEA (官方推荐)
    *   建议安装插件: Lombok (如果 IDE 未内置), EditorConfig。
2.  **版本控制**: Git
3.  **容器化 (可选)**: Docker / Docker Compose
    *   用于快速启动依赖服务（如 MySQL, PostgreSQL, Redis 等）。

## 数据库
*   **默认**: H2 Database (内嵌模式，无需额外安装，适合快速开发)。
*   **生产/测试**: 支持 MySQL, PostgreSQL 等 (需在配置文件中修改)。
