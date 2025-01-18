// src/App.tsx
import React, { useState, useEffect, createContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";
import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/SignIn";
import Header from "./components/Header";
import Notifications from "./components/Notifications";
import Settings from "./components/Settings";
import Modal from "./components/Modal";
import FolderForm from "./components/FolderForm"; // フォルダフォームを追加

import { getCurrentUser } from "./lib/api/auth";
import {
  getFolders,
  Folder,
  createFolder,
  updateFolder,
  deleteFolder,
  getTodosByFolder,
} from "./lib/api/folders"; // インポート修正
import { User } from "./interfaces/index";

import { ThemeProvider } from "./contexts/ThemeContext";
import { Sidebar } from "./components/Sidebar";
import { getTodos } from "./lib/api/todos";
import { Todo } from "./interfaces/index";
import { Home as HomeIcon, Bell, Settings as SettingsIcon } from "lucide-react";

import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import client from "./lib/api/client";

// グローバルで扱う変数・関数を定義
export const AuthContext = createContext(
  {} as {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isSignedIn: boolean;
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
    currentUser: User | undefined;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    fetchCurrentUser: () => Promise<void>;
  }
);

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  // フォルダ選択時にタスクを取得する関数
  const fetchTodosByFolder = async (folderId: number) => {
    try {
      const todos = await getTodosByFolder(folderId); // `todos` 配列を取得
      console.log("Fetched Todos by Folder:", todos); // デバッグ用ログ

      setTodos(todos); // 正しく配列をセット
    } catch (error) {
      console.error("フォルダに紐づくタスクの取得に失敗しました:", error);
      // 必要に応じてエラーメッセージを表示
    }
  };

  // 全タスクを取得する関数
  const fetchAllTodos = async () => {
    try {
      const res = await getTodos();
      if (res?.status === 200) {
        const sortedTodos = res.data.todos.sort((a: Todo, b: Todo) => {
          // 作成日の降順
          if (a.created_at && b.created_at) {
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          } else {
            return b.id - a.id;
          }
        });
        setTodos(sortedTodos);
      } else {
        console.log(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // フォルダ管理用の状態
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false); // フォルダ作成モーダル
  const [editFolder, setEditFolder] = useState<Folder | null>(null); // フォルダ編集モーダル
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null); // 選択中のフォルダ

  // 認証済みのユーザーがいるかどうかチェック
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();
      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);
      } else {
        console.log("No current user");
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  // フォルダ選択時の処理
  const handleSelectFolder = (folder: Folder | null) => {
    setSelectedFolder(folder);
    if (folder) {
      fetchTodosByFolder(folder.id);
    } else {
      fetchAllTodos();
    }
  };

  // アプリ起動時にユーザー情報とフォルダ一覧を取得
  useEffect(() => {
    const fetchData = async () => {
      await handleGetCurrentUser();
      if (isSignedIn) {
        await fetchFolders();
        await fetchAllTodos(); // デフォルトで全タスクを取得
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  // フォルダ一覧を取得
  const fetchFolders = async () => {
    try {
      const data = await getFolders();
      setFolders(data);
    } catch (error) {
      console.error("Failed to fetch folders:", error);
    }
  };

  // Todoリストを取得
  // const handleGetTodos = async () => {
  //   try {
  //     const res = await getTodos();
  //     if (res?.status === 200) {
  //       const sortedTodos = res.data.todos.sort((a: Todo, b: Todo) => {
  //         // 作成日の降順
  //         if (a.created_at && b.created_at) {
  //           return (
  //             new Date(b.created_at).getTime() -
  //             new Date(a.created_at).getTime()
  //           );
  //         } else {
  //           return b.id - a.id;
  //         }
  //       });
  //       setTodos(sortedTodos);
  //     } else {
  //       console.log(res.data.message);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // ユーザーが認証済みかどうかでルーティングを決定
  // 未認証だった場合は「/signin」ページにリダイレクト
  const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
    if (!loading) {
      return isSignedIn ? children : <Navigate to="/signin" />;
    } else {
      return <></>;
    }
  };

  // Todoリストのコンテンツ (TodoForm, TodoList) をまとめたコンポーネント
  const TodoContent = () => (
    <>
      <div className="hidden md:block">
        <TodoForm
          todos={todos}
          setTodos={setTodos}
          selectedFolder={selectedFolder}
          filter={filter}
        />
      </div>
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filter={filter}
        searchTerm={searchTerm}
        selectedFolder={selectedFolder}
      />
      <div className="md:hidden fixed bottom-10 left-0 right-0 z-40">
        <TodoForm
          todos={todos}
          setTodos={setTodos}
          selectedFolder={selectedFolder}
          filter={filter}
        />
      </div>
    </>
  );

  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        isSignedIn,
        setIsSignedIn,
        currentUser,
        setCurrentUser,
        // AuthContext に fetchCurrentUser を登録
        fetchCurrentUser: handleGetCurrentUser,
      }}
    >
      <ThemeProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-light-body dark:bg-dark-body">
            <Header
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setIsSettingsOpen={setIsSettingsOpen}
              todos={todos}
              setTodos={setTodos}
            />
            <div className="flex flex-1">
              {isSignedIn && (
                <div
                  className={`fixed inset-y-0 left-0 z-30 w-60 bg-blue-100 shadow-md transform ${
                    isMenuOpen ? "translate-x-0" : "-translate-x-full"
                  } transition-transform duration-300 ease-in-out md:sticky md:translate-x-0 top-16 h-[calc(100vh-4rem)]`}
                >
                  <Sidebar
                    setFilter={setFilter}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    setIsMenuOpen={setIsMenuOpen}
                    folders={folders}
                    onOpenCreateFolder={() => setIsFolderModalOpen(true)}
                    onOpenEditFolder={(folder) => setEditFolder(folder)}
                    onSelectFolder={handleSelectFolder}
                    selectedFolder={selectedFolder}
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="pt-16 pb-32 md:pb-16">
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <PrivateRoute>
                          <TodoContent />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/notifications"
                      element={
                        <PrivateRoute>
                          <Notifications />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/settings"
                      element={
                        <PrivateRoute>
                          <div className="md:hidden">
                            <Settings />
                          </div>
                        </PrivateRoute>
                      }
                    />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                  </Routes>
                </div>
              </div>
            </div>

            {isSignedIn && (
              <>
                <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-2 shadow-md z-50">
                  <nav>
                    <ul className="flex justify-around">
                      <li>
                        <Link to="/">
                          <HomeIcon size={24} />
                        </Link>
                      </li>
                      <li>
                        <Link to="/notifications">
                          <Bell size={24} />
                        </Link>
                      </li>
                      <li>
                        <Link to="/settings">
                          <SettingsIcon size={24} />
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </footer>

                {/* 設定用モーダル */}
                <Modal
                  isOpen={isSettingsOpen}
                  onClose={() => setIsSettingsOpen(false)}
                  title="設定"
                >
                  <Settings />
                </Modal>

                {/* フォルダ作成モーダル */}
                <Modal
                  isOpen={isFolderModalOpen}
                  onClose={() => setIsFolderModalOpen(false)}
                  title="フォルダを作成"
                >
                  <FolderForm
                    onSubmit={async (name, sharedUser) => {
                      try {
                        const newFolder = await createFolder(name);
                        setFolders([...folders, newFolder]);
                        setIsFolderModalOpen(false);
                      } catch (error) {
                        console.error("Failed to create folder:", error);
                        // 必要に応じてエラーメッセージを表示
                      }
                    }}
                  />
                </Modal>

                {/* フォルダ編集モーダル */}
                <Modal
                  isOpen={!!editFolder}
                  onClose={() => setEditFolder(null)}
                  title="フォルダを編集"
                >
                  {editFolder && (
                    <FolderForm
                      defaultName={editFolder.name}
                      defaultSharedUser={editFolder.sharedUser}
                      isEditing
                      onSubmit={async (name, sharedUser) => {
                        try {
                          const updatedFolder = await updateFolder(
                            editFolder.id,
                            name
                          );
                          setFolders(
                            folders.map((folder) =>
                              folder.id === updatedFolder.id
                                ? updatedFolder
                                : folder
                            )
                          );
                          setEditFolder(null);
                        } catch (error) {
                          console.error("Failed to update folder:", error);
                          // 必要に応じてエラーメッセージを表示
                        }
                      }}
                      onDelete={async () => {
                        if (editFolder) {
                          try {
                            await deleteFolder(editFolder.id);
                            setFolders(
                              folders.filter(
                                (folder) => folder.id !== editFolder.id
                              )
                            );
                            setEditFolder(null);
                          } catch (error) {
                            console.error("Failed to delete folder:", error);
                            // 必要に応じてエラーメッセージを表示
                          }
                        }
                      }}
                    />
                  )}
                </Modal>
              </>
            )}
          </div>
        </Router>
      </ThemeProvider>
    </AuthContext.Provider>
  );
};

export default App;
