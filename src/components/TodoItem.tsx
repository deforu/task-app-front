import React, { useState } from "react";
import { deleteTodo, updateTodo } from "../lib/api/todos";
import { Todo } from "../interfaces/index";

interface TodoItemProps {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, setTodos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [dueDate, setDueDate] = useState(todo.due_date || ""); // 修正: due_dateに変更
  const [isImportant, setIsImportant] = useState(todo.is_important); // 修正: is_importantに変更

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

  const handleUpdateTodo = async () => {
    try {
      const updatedTodo = {
        ...todo,
        title: title.trim(),
        due_date: dueDate, // 修正: due_dateに変更
        is_important: isImportant, // 修正: is_importantに変更
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

  const toggleImportant = async () => {
    try {
      const updatedTodo = { ...todo, is_important: !isImportant }; // 修正: is_importantに変更
      const res = await updateTodo(todo.id as number, updatedTodo);
      if (res?.status === 200) {
        setTodos((prev: Todo[]) =>
          prev.map((t: Todo) => (t.id === todo.id ? res.data.todo : t))
        );
        setIsImportant(!isImportant);
      } else {
        console.error(res.data.message);
      }
    } catch (err) {
      console.error("Todoの重要フラグの更新中にエラーが発生しました:", err);
    }
  };

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
              todo.is_important ? "font-bold text-blue-500" : ""
            }`} // 修正: is_importantに変更
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
          todo.due_date // 修正: due_dateに変更
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
