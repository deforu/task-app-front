// App.tsx
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
// import UserAvatar from "./components/pages/UserAvatar";

import { getCurrentUser } from "./lib/api/auth";
import { User } from "./interfaces/index";

import { ThemeProvider } from "./contexts/ThemeContext";
import { Sidebar } from "./components/Sidebar";
import { getTodos } from "./lib/api/todos";
import { Todo } from "./interfaces/index";
import { Home as HomeIcon, Bell, Settings as SettingsIcon } from "lucide-react";

import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";

// グローバルで扱う変数・関数
export const AuthContext = createContext(
  {} as {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    isSignedIn: boolean;
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
    currentUser: User | undefined;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
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

  // 認証済みのユーザーがいるかどうかチェック
  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser();

      if (res?.data.isLogin === true) {
        setIsSignedIn(true);
        setCurrentUser(res?.data.data);

        console.log(res?.data.data);
      } else {
        console.log("No current user");
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  // ユーザー情報を取得
  useEffect(() => {
    handleGetCurrentUser();
  }, []);

  // 認証状態が変更されたときにTodoリストを取得
  useEffect(() => {
    if (isSignedIn) {
      handleGetTodos();
    }
  }, [isSignedIn]);

  // Todoリストを取得
  const handleGetTodos = async () => {
    try {
      const res = await getTodos();
      // console.log("Fetched todos:", res.data.todos); // デバック用に追加
      if (res?.status === 200) {
        const sortedTodos = res.data.todos.sort((a: Todo, b: Todo) => {
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
        <TodoForm todos={todos} setTodos={setTodos} />
      </div>
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filter={filter}
        searchTerm={searchTerm}
      />
      <div className="md:hidden fixed bottom-10 left-0 right-0 z-40">
        <TodoForm todos={todos} setTodos={setTodos} />
      </div>
    </>
  );
  // ルーティング (React Router v6) の設定
  return (
    <AuthContext.Provider
      value={{
        loading,
        setLoading,
        isSignedIn,
        setIsSignedIn,
        currentUser,
        setCurrentUser,
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
                <Modal
                  isOpen={isSettingsOpen}
                  onClose={() => setIsSettingsOpen(false)}
                >
                  <Settings />
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
