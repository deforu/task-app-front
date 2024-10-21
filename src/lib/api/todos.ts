import client from "./client"
import { Todo } from "../../interfaces/index"
import apiClient from './client';


// todo一覧を取得
export const getTodos = async () => {
  try {
    const res = await apiClient.get("/todos");
    return res;
  } catch (err) {
    console.error("Todosの取得中にエラーが発生しました:", err);
    throw err;
  }
};

// todoを新規作成
export const createTodo = (data: Omit<Todo, "id">) => {
  return client.post("/todos", { todo: data });
};

// todoを削除
export const deleteTodo = (id: number) => {
  return client.delete(`/todos/${id}`)
}

// todoを更新
export const updateTodo = async (id: number, updatedTodo: Partial<Todo>) => {
  try {
    const res = await apiClient.put(`/todos/${id}`, updatedTodo);
    return res;
  } catch (err) {
    console.error(`Todo (ID: ${id}) の更新中にエラーが発生しました:`, err);
    throw err;
  }
};