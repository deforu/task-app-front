import React, { useState } from "react"
import { deleteTodo, updateTodo } from "../lib/api/todos"
import { Todo } from "../interfaces/index"

interface TodoItemProps {
  todo: Todo
  setTodos: Function
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, setTodos }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)

  const handleDeleteTodo = async (id: number) => {
    try {
      const res = await deleteTodo(id)
      console.log(res)

      if (res?.status === 200) {
        setTodos((prev: Todo[]) => prev.filter((todo: Todo) => todo.id !== id))
      } else {
        console.log(res.data.message)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdateTodo = async () => {
    try {
      const res = await updateTodo(todo.id as number, { title })
      console.log(res)

      if (res?.status === 200) {
        setTodos((prev: Todo[]) =>
          prev.map((t: Todo) => (t.id === todo.id ? res.data.todo : t))
        )
        setIsEditing(false)
      } else {
        console.log(res.data.message)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <tr>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          todo.title
        )}
      </td>
      <td>
        {isEditing ? (
          <button onClick={handleUpdateTodo}>Update</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button onClick={() => handleDeleteTodo(todo.id as number)}>Delete</button>
      </td>
    </tr>
  )
}
