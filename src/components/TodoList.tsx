import React, { useState } from "react"
import { Todo } from "../interfaces/index"

interface TodoListProps {
  todos: Todo[]
  setTodos: Function
}

export const TodoList: React.FC<TodoListProps> = ({ todos, setTodos }) => {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [updatedTitle, setUpdatedTitle] = useState<string>("")

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleUpdateTodo = (id: number) => {
    if (updatedTitle.trim() !== "") {
      setTodos(todos.map(todo => todo.id === id ? { ...todo, title: updatedTitle } : todo))
      setEditingId(null)
      setUpdatedTitle("")
    }
  }

  return (
    <ul className="list-none p-5">
      {todos.map(todo => (
        <li key={todo.id} className="flex justify-between items-center p-4 mb-4 border border-blue-300 rounded bg-white shadow">
          <input type="checkbox" />
          {editingId === todo.id ? (
            <input
              type="text"
              className="flex-1 mx-2 p-2 border border-blue-300 rounded"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
          ) : (
            <span className="flex-1 mx-2">{todo.title}</span>
          )}
          <div>
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
                  setEditingId(todo.id as number)
                  setUpdatedTitle(todo.title)
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
  )
}
