# Halo 应用发布规范 (Publishing Application)

记录如何将开发完成的插件或主题发布到 Halo 应用市场（App Store），使社区用户能够发现并安装。

## 1. 发布平台
*   **Halo 应用市场**: [https://www.halo.run/store/apps](https://www.halo.run/store/apps)
*   **收录仓库**: 提交 PR 至 `halo-sigs/awesome-halo` 组织。

## 2. 发布前提
*   **开源托管**: 应用必须托管在 GitHub 上，并添加对应的 Topic（如 `#halo-plugin` 或 `#halo-theme`）。
*   **版本规范**: 遵循 **语义化版本 (SemVer)** 规范。
*   **描述文件完整性**: 
    *   `plugin.yaml` (插件) 或 `theme.yaml` (主题) 必须包含正确的 `homepage`, `issues`, `license`。
    *   **图标 (Logo)**: 插件必须提供一个唯一的图标，不能使用默认的 Halo 图标。
*   **文档说明**: 必须包含完善的 README（介绍、安装说明、使用指南）。

## 3. 提交审核流程
1.  **提交 PR**: 在 GitHub 的 `awesome-halo` 仓库提交 Pull Request。
2.  **勾选选项**: 在 PR 描述中勾选“同步到 Halo 应用市场”。
3.  **作者关联**: 在 PR 中备注你的 Halo 官网用户名，以便获得后续的应用管理权限。
4.  **官方审核**: Halo 维护者会对应用进行安全性和规范性审查。

## 4. 自动化发布 (CI/CD)
*   官方支持通过 GitHub Actions 实现自动化发布。
*   **配置**: 在 GitHub Secrets 中配置 `HALO_PAT` (个人访问令牌) 以及应用的 `app-id`。
*   **效果**: 当你在 GitHub 发布一个新的 Release 时，系统会自动将产物同步至 Halo 应用市场。

## 5. 最佳实践
*   **完善描述**: 提供清晰的功能描述和效果截图。
*   **多语言**: 建议提供中英文双语文档。
*   **许可证**: 确保依赖库的许可证与应用分发许可证兼容。
