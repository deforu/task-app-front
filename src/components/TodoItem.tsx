//TodoItem.tsx
import React, { useState } from "react";
import { deleteTodo, updateTodo } from "../lib/api/todos";
import { Todo } from "../interfaces/index";

// TodoItemコンポーネントのPropsの型定義
interface TodoItemProps {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

// TodoItemコンポーネント
export const TodoItem: React.FC<TodoItemProps> = ({ todo, setTodos }) => {
  const [isEditing, setIsEditing] = useState(false); // 編集中かどうかのフラグ
  const [title, setTitle] = useState(todo.title); // タイトル
  const [dueDate, setDueDate] = useState(todo.dueDate || ""); // 期限日
  const [isImportant, setIsImportant] = useState(todo.isImportant); // 重要フラグ

  // Todoの削除処理
  const handleDeleteTodo = async (id: number) => {
    try {
      const res = await deleteTodo(id);
      if (res?.status === 200) {
        setTodos((prev: Todo[]) => prev.filter((todo: Todo) => todo.id !== id));
      } else {
        console.error(res.data.message);
      }
    } catch (err) {
      console.error("Todoの削除中にエラーが発生しました:", err);
    }
  };

  // Todoの更新処理
  const handleUpdateTodo = async () => {
    try {
      const updatedTodo = {
        ...todo,
        title: title.trim(),
        dueDate: dueDate,
        isImportant: isImportant,
      };
      const res = await updateTodo(todo.id as number, updatedTodo);
      if (res?.status === 200) {
        setTodos((prev: Todo[]) =>
          prev.map((t: Todo) => (t.id === todo.id ? res.data.todo : t))
        );
        setIsEditing(false);
      } else {
        console.error(res.data.message);
      }
    } catch (err) {
      console.error("Todoの更新中にエラーが発生しました:", err);
    }
  };

  // Todoの完了状態の更新処理
  const toggleComplete = async () => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      const res = await updateTodo(todo.id as number, updatedTodo);
      if (res?.status === 200) {
        setTodos((prev: Todo[]) =>
          prev.map((t: Todo) => (t.id === todo.id ? res.data.todo : t))
        );
      } else {
        console.error(res.data.message);
      }
    } catch (err) {
      console.error("Todoの完了状態の更新中にエラーが発生しました:", err);
    }
  };

  // 重要フラグの更新処理
  const toggleImportant = async () => {
    try {
      const updatedTodo = { ...todo, isImportant: !todo.isImportant };
      const res = await updateTodo(todo.id as number, updatedTodo);
      if (res?.status === 200) {
        setTodos((prevTodos) =>
          prevTodos.map((t) => (t.id === todo.id ? res.data.todo : t))
        );
      } else {
        console.error(res.data.message);
      }
    } catch (err) {
      console.error("重要フラグの更新中にエラーが発生しました:", err);
    }
  };

  // TodoItemコンポーネントの描画
  return (
    <tr className="border-b">
      <td className="py-2 px-4">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={toggleComplete}
          className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
        />
      </td>
      <td className="py-2 px-4">
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-lg p-2 w-full"
          />
        ) : (
          <span
            className={`${todo.completed ? "line-through text-gray-500" : ""} ${
              todo.isImportant ? "font-bold text-blue-500" : ""
            }`}
          >
            {todo.title}
          </span>
        )}
      </td>
      <td className="py-2 px-4 text-sm">
        {isEditing ? (
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border rounded-lg p-2"
          />
        ) : (
          todo.dueDate
        )}
      </td>
      <td className="py-2 px-4">
        <button
          onClick={toggleImportant}
          className={`text-sm ${
            isImportant ? "text-blue-500" : "text-gray-400"
          }`}
        >
          {isImportant ? "重要" : "未設定"}
        </button>
      </td>
      <td className="py-2 px-4">
        {isEditing ? (
          <button
            onClick={handleUpdateTodo}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            保存
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            編集
          </button>
        )}
      </td>
      <td className="py-2 px-4">
        <button
          onClick={() => handleDeleteTodo(todo.id as number)}
          className="text-sm text-red-500 hover:text-red-700"
        >
          削除
        </button>
      </td>
    </tr>
  );
};
