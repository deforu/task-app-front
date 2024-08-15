import React, { useState } from "react"
import { createTodo } from "../lib/api/todos"
import { Todo } from "../interfaces/index"

interface TodoFormProps {
  todos: Todo[]
  setTodos: Function
}

export const TodoForm: React.FC<TodoFormProps> = ({ todos, setTodos }) => {
  const [title, setTitle] = useState<string>("")

  const handleCreateTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data: Todo = {
      title: title
    }

    try {
      const res = await createTodo(data)
      console.log(res)

      if (res.status === 200) {
        setTodos([...todos, res.data.todo])
      } else {
        console.log(res.data.message)
      }
    } catch (err) {
      console.log(err)
    }

    setTitle("")
  }

  return (
    <form
      onSubmit={handleCreateTodo}
      className="fixed top-100% left-10% w-full p-4 bg-white shadow-md z-10"
    >
      <div className="mb-4">
        <input
          type="text"
          value={title}
          className="w-80 p-2 border border-blue-300 rounded"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value)
          }}
        />
      </div>
      <input
        type="submit"
        value="Add"
        disabled={!title}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      />
    </form>
  )
}
