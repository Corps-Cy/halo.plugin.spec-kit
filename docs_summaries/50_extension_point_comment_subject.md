# Halo 服务端扩展点：评论主体展示 (CommentSubject)

当插件定义了自定义模型（如日记、书籍、电影等）并启用了评论功能时，`CommentSubject` 扩展点决定了在 Halo 管理后台的评论列表中如何展示这些评论的“来源主体”。

## 1. 核心职能
*   **用途**: 为评论提供上下文背景。例如：显示该评论是针对哪一本书、哪一篇文章。
*   **表现**: 如果未实现此扩展点，后台评论列表的“主体”栏将显示为“未知”。

## 2. 核心接口 `CommentSubject<T extends Extension>`
插件需要实现该接口，其中 `T` 是你自定义的资源类。

### 关键方法：
*   **`supports(Ref ref)`**: 
    *   **逻辑**: 判断当前评论引用的资源（Ref）是否属于本插件处理范围。通常根据 `group` 和 `kind` 判定。
*   **`getSubjectDisplay(String name)`**:
    *   **逻辑**: 根据资源的名称，返回一个包含 `title` (标题), `url` (访问链接), `kindName` (资源类型名称) 的 `SubjectDisplay` 对象。
    *   **返回**: `Mono<SubjectDisplay>`。

## 3. 实现步骤

### 第一步：实现接口
```java
@Component
public class MyTodoCommentSubject implements CommentSubject<Todo> {

    @Override
    public boolean supports(Ref ref) {
        return "todo.plugin.halo.run".equals(ref.getGroup()) && "Todo".equals(ref.getKind());
    }

    @Override
    public Mono<SubjectDisplay> getSubjectDisplay(String name) {
        return client.fetch(Todo.class, name)
            .map(todo -> SubjectDisplay.builder()
                .title(todo.getSpec().getTitle())
                .url("/todos/" + name) // 前台访问路径
                .kindName("待办事项")    // 后台展示的资源分类名
                .build());
    }
}
```

### 第二步：定义 `ExtensionDefinition`
```yaml
apiVersion: plugin.halo.run/v1alpha1
kind: ExtensionDefinition
metadata:
  name: todo-comment-subject
spec:
  extensionPointName: "comment-subject"
  className: "myTodoCommentSubject"
  displayName: "Todo Comment Subject Provider"
```

## 4. 关键点
*   **回退逻辑**: Halo 默认只实现了“文章 (Post)”和“页面 (Page)”的展示逻辑。所有插件自定义资源都必须通过此扩展点来“告诉”管理后台如何显示。
*   **多实例**: 系统支持多个 `CommentSubject` 实现并存。Halo 会通过 `supports` 方法轮询找到匹配的处理器。

## 5. 适用场景
*   为自定义内容模型（如相册、资源下载）提供评论后台管理支持。
*   美化后台评论列表的展示信息，方便管理员快速点击跳转到原始页面。
