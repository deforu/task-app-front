import React, { useState, useEffect } from "react"
import { TodoList } from "./components/TodoList"
import { TodoForm } from "./components/TodoForm"
import Header from './components/Header'
import Sidebar from './components/Sidebar'


import { getTodos } from "./lib/api/todos"
import { Todo} from "./interfaces/index"

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  const handleGetTodos = async () => {
    try {
      const res = await getTodos()
      console.log(res)

      if (res?.status === 200) {
        setTodos(res.data.todos)
      } else {
        console.log(res.data.message)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    handleGetTodos()
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-blue-50">
      <Header /> 
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <TodoForm todos={todos} setTodos={setTodos}/>
          <h1 className="text-2xl font-bold p-5">タスク</h1>
          <TodoList todos={todos} setTodos={setTodos} />
        </div>
      </div>
    </div>
  )
}

export default App