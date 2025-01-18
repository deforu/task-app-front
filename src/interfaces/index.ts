export interface Todo {
  id: number;                // ID
  title: string;             // タイトル
  completed: boolean;        // 完了フラグ
  dueDate: string;           // 期日
  isImportant: boolean;      // 重要フラグ
  created_at?: string;       // 作成日時
  // updated_at: string;        // 更新日時
  // description: string;       // 詳細
  // folder_id: number;         // フォルダID  _はいらない？
  // user_id: number;           // ユーザーID  _はいらない？
}

// サインアップ
export interface SignUpParams {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

// サインイン
export interface SignInParams {
  email: string
  password: string
}

// ユーザー
export interface User {
  id: number
  uid: string
  provider: string
  email: string
  name: string
  nickname?: string
  image?: string
  allowPasswordChange: boolean
  created_at: Date
  updated_at: Date
  avatarUrl?: string;
}

// フォルダ
export interface Folder {
  id: number;
  name: string;
  userId: number;
  created_at: string;
  updated_at: string;
  sharedUser?: string; // もしバックエンドで管理していない場合は、フロントエンドのみで管理するならオプショナルに
}