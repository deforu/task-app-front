//TodoList.tsx
import React, { useState, useEffect } from "react";
import { Todo } from "../interfaces/index";
import { updateTodo, deleteTodo } from "../lib/api/todos";

interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, setTodos }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState<string>("");
  const [updatedDueDate, setUpdatedDueDate] = useState<string>("");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [completingId, setCompletingId] = useState<number | null>(null);

  const handleDeleteTodo = (id: number) => {
    setDeletingId(id);
  };

  useEffect(() => {
    if (completingId !== null) {
      const timer = setTimeout(() => {
        const updatedTodos = todos.map((todo) =>
          todo.id === completingId ? { ...todo, completed: true } : todo
        );
        setTodos(updatedTodos);
        setCompletingId(null);
      }, 800); // 0.8秒の遅延

      return () => clearTimeout(timer);
    }
  }, [completingId, todos, setTodos]);

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

  const cancelDelete = () => {
    setDeletingId(null);
  };

  const handleUpdateTodo = async (id: number) => {
    if (updatedTitle.trim() !== "") {
      try {
        const res = await updateTodo(id, {
          title: updatedTitle.trim(),
          due_date: updatedDueDate,
        });
        if (res?.status === 200) {
          setTodos(
            todos.map((todo) => (todo.id === id ? res.data.todo : todo))
          );
          setEditingId(null);
          setUpdatedTitle("");
          setUpdatedDueDate("");
        } else {
          console.error("タスクの更新に失敗しました:", res.data.message);
        }
      } catch (error) {
        console.error("タスクの更新に失敗しました:", error);
      }
    }
  };

  const handleToggleComplete = async (id: number) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (todoToUpdate && !todoToUpdate.completed) {
      setCompletingId(id);
      try {
        const res = await updateTodo(id, {
          completed: true,
        });
        if (res?.status === 200) {
          console.log("before ", todos);
          setTodos(
            todos.map((todo) => (todo.id === id ? res.data.todo : todo))
          );
          console.log("after ", todos);
        } else {
          console.error(
            "タスクの完了状態の更新に失敗しました:",
            res.data.message
          );
          setCompletingId(null);
        }
      } catch (error) {
        console.error("タスクの完了状態の更新に失敗しました:", error);
        setCompletingId(null);
      }
    } else if (todoToUpdate && todoToUpdate.completed) {
      try {
        const res = await updateTodo(id, {
          completed: false,
        });
        if (res?.status === 200) {
          setTodos(
            todos.map((todo) => (todo.id === id ? res.data.todo : todo))
          );
        } else {
          console.error(
            "タスクの完了状態の更新に失敗しました:",
            res.data.message
          );
        }
      } catch (error) {
        console.error("タスクの完了状態の更新に失敗しました:", error);
      }
    }
  };

  const handleToggleImportant = async (id: number) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (todoToUpdate) {
      try {
        const res = await updateTodo(id, {
          is_important: !todoToUpdate.is_important,
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
  };

  const getTodoTextColor = (todo: Todo) => {
    if (todo.completed) return "text-gray-500";
    return "";
  };

  const renderTodoItem = (todo: Todo) => (
    <li
      key={todo.id}
      className={`flex flex-col p-4 mb-4 border border-blue-300 rounded bg-white shadow
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
          {completingId === todo.id && (
            <svg
              className="absolute -top-1 -right-1 w-4 h-4 text-green-500 fill-current animate-complete"
              viewBox="0 0 20 20"
            >
              <path d="M10 0C4.477 0 0 4.477 0 10c0 5.522 4.477 10 10 10 5.522 0 10-4.478 10-10 0-5.523-4.478-10-10-10zm5.293 7.293l-6.25 6.25a1 1 0 0 1-1.414 0l-3.125-3.125a1 1 0 1 1 1.414-1.414L8.125 11.25l5.293-5.293a1 1 0 1 1 1.414 1.414z" />
            </svg>
          )}
        </div>
        {editingId === todo.id ? (
          <input
            type="text"
            className="flex-1 mx-2 p-2 border border-blue-300 rounded"
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
              className="mx-2 p-2 border border-blue-300 rounded"
              value={updatedDueDate}
              onChange={(e) => setUpdatedDueDate(e.target.value)}
            />
          ) : (
            <span className="text-sm text-gray-500">{todo.due_date}</span>
          )}
        </div>
        <div className="flex items-center">
          <button
            className={`mr-2 focus:outline-none ${
              todo.is_important ? "text-yellow-500" : "text-gray-400"
            }`}
            onClick={() => handleToggleImportant(todo.id as number)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={todo.is_important ? "currentColor" : "none"}
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
                setUpdatedDueDate(todo.due_date || "");
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
  );

  return (
    <div>
      <ul className="list-none p-5">
        <h1 className="text-2xl font-bold p-5">タスク</h1>
        {todos.filter((todo) => !todo.completed).map(renderTodoItem)}
      </ul>

      {/* Separator Line */}
      <hr className="border-t-2 border-gray-300 my-4" />

      {/* Completed Tasks */}
      <ul className="list-none p-5">
        <h1 className="text-2xl font-bold p-5">完了済み</h1>
        {todos.filter((todo) => todo.completed).map(renderTodoItem)}
      </ul>
      {deletingId !== null && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg">
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
