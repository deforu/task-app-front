import React, { useState, useEffect, useCallback } from "react";
import { Todo } from "../interfaces/index";
import { updateTodo, deleteTodo } from "../lib/api/todos";
// import { useTheme } from "../contexts/ThemeContext";　未使用のためコメントアウト

interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filter: string;
  searchTerm: string;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  setTodos,
  filter,
  searchTerm,
}) => {
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState<string>("");
  const [updatedDueDate, setUpdatedDueDate] = useState<string>("");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [completingId, setCompletingId] = useState<number | null>(null);
  // const { theme } = useTheme();　未使用のためコメントアウト

  // フィルタリング処理
  const applyFilters = useCallback(() => {
    // console.log("Applying filters:", { filter, searchTerm });
    // console.log("Original todos:", todos);

    let updatedTodos = [...todos]; // オリジナルのタスクリストをコピー

    // タスクの状態によってフィルタリングし、更新されたタスクリストをセット・表示
    switch (filter) {
      case "today":
        const today = new Date().toISOString().split("T")[0];
        updatedTodos = updatedTodos.filter((todo) => {
          // console.log(`Todo due date: ${todo.dueDate}, Today: ${today}`);
          return todo.dueDate === today;
        });
        break;
      case "important":
        updatedTodos = updatedTodos.filter((todo) => {
          // console.log(`Todo isImportant: ${todo.isImportant}`);
          return todo.isImportant;
        });
        break;
      case "completed":
        updatedTodos = updatedTodos.filter((todo) => todo.completed);
        break;
      default:
        // "all" の場合は全て表示
        break;
    }

    // 検索フィルタリング
    if (searchTerm) {
      updatedTodos = updatedTodos.filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // 作成日の降順でソート
    updatedTodos.sort((a: Todo, b: Todo) => {
      if (a.created_at && b.created_at) {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      } else {
        return (b.id ?? 0) - (a.id ?? 0);
      }
    });

    // console.log("Filtered todos:", updatedTodos);
    setFilteredTodos(updatedTodos);
  }, [todos, filter, searchTerm]);

  // フィルターの変更時に再度フィルタリングを適用
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // フィルタリング後のタスクリストの変更を監視
  useEffect(() => {
    // console.log("Filtered todos after applying filters:", filteredTodos);
  }, [filteredTodos]);

  // 削除処理
  const handleDeleteTodo = (id: number) => {
    setDeletingId(id);
  };
  // 削除確認
  const confirmDelete = async () => {
    if (deletingId !== null) {
      try {
        const res = await deleteTodo(deletingId);
        if (res?.status === 200) {
          setTodos(todos.filter((todo) => todo.id !== deletingId));
          setDeletingId(null);
        } else {
          console.error("タスクの削除に失敗しました:", res.data.message);
          alert("タスクの削除に失敗しました。もう一度お試しください。");
        }
      } catch (error) {
        console.error("タスクの削除に失敗しました:", error);
        alert("タスクの削除に失敗しました。もう一度お試しください。");
      }
    }
  };
  // 削除キャンセル
  const cancelDelete = () => {
    setDeletingId(null);
  };
  // タスクの更新処理
  const handleUpdateTodo = useCallback(
    async (id: number) => {
      if (updatedTitle.trim() !== "" && updatedDueDate.trim() !== "") {
        try {
          const res = await updateTodo(id, {
            title: updatedTitle.trim(),
            dueDate: updatedDueDate,
          });

          if (res.status === 200 && res.data.todo) {
            setTodos(
              todos.map((todo) => (todo.id === id ? res.data.todo : todo))
            );
            setEditingId(null);
            setUpdatedTitle("");
            setUpdatedDueDate("");
          } else {
            console.error("タスクの更新に失敗しました:", res.data.message);
            alert("タスクの更新に失敗しました。もう一度お試しください。");
          }
        } catch (error: any) {
          if (error.response && error.response.data) {
            console.error(
              "タスクの更新に失敗しました:",
              error.response.data.errors.join(", ")
            );
            alert(
              `タスクの更新に失敗しました: ${error.response.data.errors.join(
                ", "
              )}`
            );
          } else {
            console.error("タスクの更新に失敗しました:", error.message);
            alert("タスクの更新に失敗しました。もう一度お試しください。");
          }
        }
      } else {
        alert("タイトルと期日を入力してください。");
      }
    },
    [updatedTitle, updatedDueDate, todos, setTodos]
  );
  // タスクの完了状態の更新
  const handleToggleComplete = useCallback(
    async (id: number) => {
      const todoToUpdate = todos.find((todo) => todo.id === id);
      if (!todoToUpdate) return;

      const newCompletedStatus = !todoToUpdate.completed;

      if (newCompletedStatus) {
        // タスクを完了にする場合: アニメーションを適用
        setCompletingId(id);
        setTimeout(async () => {
          await updateTodoStatus(id, newCompletedStatus);
          setCompletingId(null);
        }, 800); // 0.8秒の遅延
      } else {
        // タスクを未完了にする場合: 即座に状態を更新
        await updateTodoStatus(id, newCompletedStatus);
      }
    },
    [todos]
  );
  // 重要フラグのトグル
  const handleToggleImportant = useCallback(
    async (id: number) => {
      const todoToUpdate = todos.find((todo) => todo.id === id);
      if (todoToUpdate) {
        try {
          const res = await updateTodo(id, {
            isImportant: !todoToUpdate.isImportant,
          });

          if (res?.status === 200) {
            setTodos(
              todos.map((todo) => (todo.id === id ? res.data.todo : todo))
            );
          } else {
            console.error(
              "タスクの重要フラグの更新に失敗しました:",
              res.data.message
            );
          }
        } catch (error) {
          console.error("タスクの重要フラグの更新に失敗しました:", error);
        }
      }
    },
    [todos, setTodos]
  );
  // タスクの完了状態の更新
  const updateTodoStatus = async (id: number, completed: boolean) => {
    try {
      const res = await updateTodo(id, { completed });
      if (res?.status === 200 && res.data.todo) {
        setTodos(todos.map((todo) => (todo.id === id ? res.data.todo : todo)));
      } else {
        console.error(
          "タスクの完了状態の更新に失敗しました:",
          res.data.message
        );
      }
    } catch (error) {
      console.error("タスクの完了状態の更新に失敗しました:", error);
    }
  };
  // タスクのテキストカラーを取得
  const getTodoTextColor = (todo: Todo) => {
    if (todo.completed) return "text-light-text dark:text-dark-text";
    return "text-light-text dark:text-dark-text";
  };

  // タスクアイテムのレンダリング
  const renderTodoItem = useCallback(
    (todo: Todo) => (
      <li
        key={todo.id}
        className={`flex flex-col p-4 mb-4 border border-light-card dark:border-dark-card rounded bg-light-input dark:bg-dark-card shadow
        ${completingId === todo.id ? "animate-fadeOut" : ""}`}
      >
        <div className="flex items-center mb-2">
          <div className="relative mr-2">
            <input
              type="checkbox"
              checked={todo.completed || completingId === todo.id}
              onChange={() => handleToggleComplete(todo.id as number)}
              className="hidden"
              id={`todo-${todo.id}`}
            />
            <label
              htmlFor={`todo-${todo.id}`}
              className={`w-5 h-5 border-2 rounded-sm flex items-center justify-center cursor-pointer
              ${
                todo.completed || completingId === todo.id
                  ? "bg-blue-500 border-blue-500"
                  : "border-gray-400"
              }
              transition-all duration-200 ease-in-out`}
            >
              {(todo.completed || completingId === todo.id) && (
                <svg
                  className="w-3 h-3 text-white fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                </svg>
              )}
            </label>
          </div>
          {editingId === todo.id ? (
            <input
              type="text"
              className="flex-1 mx-2 p-2 border border-light-card dark:border-dark-card rounded bg-light-input dark:bg-dark-input text-light-text dark:text-dark-text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
          ) : (
            <span
              className={`flex-1 ${
                todo.completed ? "line-through" : ""
              } ${getTodoTextColor(todo)}`}
            >
              {todo.title}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div>
            {editingId === todo.id ? (
              <input
                type="date"
                className="mx-2 p-2 border border-light-card dark:border-dark-card rounded bg-light-input dark:bg-dark-input text-light-text dark:text-dark-text"
                value={updatedDueDate}
                onChange={(e) => setUpdatedDueDate(e.target.value)}
                required
              />
            ) : (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {todo.dueDate}
              </span>
            )}
          </div>
          <div className="flex items-center">
            <button
              className={`mr-2 focus:outline-none ${
                todo.isImportant ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={() => handleToggleImportant(todo.id as number)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={todo.isImportant ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </button>
            {editingId === todo.id ? (
              <button
                className="text-blue-500 hover:text-blue-700 mr-2"
                onClick={() => handleUpdateTodo(todo.id as number)}
              >
                保存
              </button>
            ) : (
              <button
                className="text-blue-500 hover:text-blue-700 mr-2"
                onClick={() => {
                  setEditingId(todo.id as number);
                  setUpdatedTitle(todo.title);
                  setUpdatedDueDate(todo.dueDate || "");
                }}
              >
                編集
              </button>
            )}
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDeleteTodo(todo.id as number)}
            >
              削除
            </button>
          </div>
        </div>
      </li>
    ),
    [
      completingId,
      editingId,
      updatedTitle,
      updatedDueDate,
      handleToggleComplete,
      handleToggleImportant,
      handleUpdateTodo,
    ]
  );

  // レンダリング
  return (
    <div className="text-light-text dark:text-dark-text">
      <ul className="list-none p-5">
        <h1 className="text-2xl font-bold p-5">タスク</h1>
        {/* <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <h2>タイトル: {todo.title}</h2>
              <p>完了＝ {todo.completed ? "Yes" : "No"}</p>
              <p>日付: {todo.dueDate}</p>
              <p>重要フラグ＝ {todo.isImportant ? "Yes" : "No"}</p>
              <p>作成日: {todo.created_at}</p>
              <p>id: {todo.id}</p>
              <a href={`/todos/${todo.id}`}>詳細</a>
              <p>------------------------------------</p>
            </li>
          ))}
        </ul> */}
        {filteredTodos.filter((todo) => !todo.completed).map(renderTodoItem)}
      </ul>

      <hr className="border-t-2 border-gray-300 my-4 dark:border-gray-700" />

      <ul className="list-none p-5">
        <h1 className="text-2xl font-bold p-5">完了済み</h1>
        {filteredTodos.filter((todo) => todo.completed).map(renderTodoItem)}
      </ul>

      {deletingId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-black bg-opacity-50 h-full w-full">
          <div className="bg-light-body dark:bg-dark-body p-5 rounded-lg">
            <p className="mb-4">本当に削除しますか？</p>
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={confirmDelete}
              >
                削除
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                onClick={cancelDelete}
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
