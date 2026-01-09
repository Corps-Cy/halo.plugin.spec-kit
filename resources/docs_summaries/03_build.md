# Halo 项目构建 (Build)

## 构建全量项目
1.  **准备**:
    *   (可选) 下载插件预设: `./gradlew downloadPluginPresets`
2.  **执行构建**:
    *   命令: `./gradlew clean build -x check`
    *   `-x check`: 忽略代码检查以加快构建速度。

## 构建产物
*   **Fat Jar 位置**: `application/build/libs/halo-${version}.jar`
*   该 Jar 包包含所有运行时依赖，可直接通过 `java -jar` 运行。

## Docker 镜像构建
1.  **前提**: 必须先执行上述全量构建生成 Fat Jar。
2.  **构建命令**:
    *   `docker build -t halo-dev/halo:${tag_name} .`
    *   `${tag_name}` 替换为所需的镜像标签。

## 关键配置
*   **版本控制**: 构建版本号由项目根目录下的 `gradle.properties` 中的 `version` 属性定义。
