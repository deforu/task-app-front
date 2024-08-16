import React, { useState } from "react";
import { Todo } from "../interfaces/index";

interface TodoListProps {
  todos: Todo[];
  setTodos: Function;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, setTodos }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState<string>("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDeleteTodo = (id: number) => {
    setDeletingId(id);
  };

  const confirmDelete = () => {
    if (deletingId !== null) {
      setTodos(todos.filter((todo) => todo.id !== deletingId));
      setDeletingId(null);
    }
  };

  const cancelDelete = () => {
    setDeletingId(null);
  };

  const handleUpdateTodo = (id: number) => {
    if (updatedTitle.trim() !== "") {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, title: updatedTitle } : todo
        )
      );
      setEditingId(null);
      setUpdatedTitle("");
    }
  };

  const handleToggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <ul className="list-none p-5 mt-10">
        <h1 className="text-2xl font-bold p-5 mt-20">タスク</h1>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center p-4 mb-4 border border-blue-300 rounded bg-white shadow"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id as number)}
            />
            {editingId === todo.id ? (
              <input
                type="text"
                className="flex-1 mx-2 p-2 border border-blue-300 rounded"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
            ) : (
              <span
                className={`flex-1 mx-2 ${
                  todo.completed ? "line-through" : ""
                }`}
              >
                {todo.title}
              </span>
            )}
            <div>
              {editingId === todo.id ? (
                <button
                  className="text-blue-500 hover:text-blue-700 mr-10"
                  onClick={() => handleUpdateTodo(todo.id as number)}
                >
                  保存
                </button>
              ) : (
                <button
                  className="text-blue-500 hover:text-blue-700 mr-10"
                  onClick={() => {
                    setEditingId(todo.id as number);
                    setUpdatedTitle(todo.title);
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
          </li>
        ))}
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
