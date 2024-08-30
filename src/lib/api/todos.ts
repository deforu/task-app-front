import client from "./client"
import { Todo } from "../../interfaces/index"

// todo一覧を取得
export const getTodos = () => {
  return client.get("/todos")
}

// todoを新規作成
export const createTodo = (data: Omit<Todo, "id">) => {
  return client.post("/todos", { todo: data });
};

// todoを削除
export const deleteTodo = (id: number) => {
  return client.delete(`/todos/${id}`)
}

// todoを更新
export const updateTodo = async (id: number, data: Partial<Todo>) => {
  return await client.put(`/todos/${id}`, { todo: data });
};