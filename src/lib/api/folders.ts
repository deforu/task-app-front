// src/lib/api/folders.ts
import { Todo } from "../../interfaces/index";
import client from "./client";

// フォルダの型定義
export interface Folder {
  id: number;
  name: string;
  userId: number;
  sharedUser?: string;
  created_at: string;
  updated_at: string;
}

/**
 * フォルダ一覧の取得
 */
export const getFolders = async (): Promise<Folder[]> => {
  try {
    const response = await client.get("/folders");
    return response.data;
  } catch (error) {
    console.error("Error fetching folders:", error);
    throw error;
  }
};

/**
 * フォルダの作成
 * @param name フォルダ名
 */
export const createFolder = async (name: string): Promise<Folder> => {
  try {
    const response = await client.post("/folders", {
      folder: { name },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating folder:", error);
    throw error;
  }
};

/**
 * フォルダの編集
 * @param id フォルダID
 * @param name 新しいフォルダ名
 */
export const updateFolder = async (id: number, name: string): Promise<Folder> => {
  try {
    const response = await client.patch(`/folders/${id}`, {
      folder: { name },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating folder:", error);
    throw error;
  }
};

/**
 * フォルダの削除
 * @param id フォルダID
 */
export const deleteFolder = async (id: number): Promise<void> => {
  try {
    await client.delete(`/folders/${id}`);
  } catch (error) {
    console.error("Error deleting folder:", error);
    throw error;
  }
};

/**
 * フォルダに紐づくTodo一覧の取得
 * @param folderId フォルダID
 */
export const getTodosByFolder = async (folderId: number): Promise<Todo[]> => {
  try {
    const response = await client.get(`/folders/${folderId}`);
    return response.data.todos; // ここがオブジェクト全体を返している可能性があります
  } catch (error) {
    console.error("Error fetching todos by folder:", error);
    throw error;
  }
};
