//TodoForm.tsx
import React, { useState } from "react";
import { createTodo } from "../lib/api/todos";
import { Todo } from "../interfaces/index";

interface TodoFormProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoForm: React.FC<TodoFormProps> = ({ todos, setTodos }) => {
  const [title, setTitle] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [isImportant, setIsImportant] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const handleCreateTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];
    const data = {
      title: title.trim(),
      completed: false,
      due_date: dueDate || today,
      is_important: isImportant,
    };

    try {
      const res = await createTodo(data);
      if (res.status === 200) {
        setTodos([res.data.todo, ...todos]);
        setTitle("");
        setDueDate("");
        setIsImportant(false);
      } else {
        console.error(res.data.message);
        console.error(res.data.errors);
      }
    } catch (err) {
      console.error("Todoの作成中にエラーが発生しました:", err);
    }
  };

  return (
    <div className="sticky top-16 bg-white shadow-md z-20 p-4 relative">
      {" "}
      {/* relativeクラスを追加 */}
      <div className="w-full max-w-2xl mx-auto">
        <form onSubmit={handleCreateTodo} className="flex items-center">
          <div className="relative flex-grow">
            <input
              type="text"
              value={title}
              placeholder="タスクを入力"
              className="w-full bg-blue-100 hover:bg-gray-100 p-3 pr-20 rounded-lg"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center">
              <button
                type="button"
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="p-1 text-blue-500 hover:text-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setIsImportant(!isImportant)}
                className={`p-1 ${
                  isImportant ? "text-blue-500" : "text-gray-400"
                } hover:text-blue-700`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={isImportant ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={!title}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          >
            追加
          </button>
        </form>
        {showDatePicker && (
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-1 p-2 bg-white border rounded-lg shadow-md z-50">
            {/* カレンダーを画面中央に表示するためにスタイルを修正 */}
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="p-1 border rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
};
