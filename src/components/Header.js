import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, Settings as SettingsIcon } from "lucide-react";
// import { useTheme } from "../contexts/ThemeContext"; // ThemeContextをインポート(未使用)
import { AuthContext } from "../App"; // AuthContextをインポート
import { signOut } from "../lib/api/auth";
import Cookies from "js-cookie";
import axios from "axios";

// Todo型を明示
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// // Props型定義
// interface HeaderProps {
//   isMenuOpen: boolean;
//   setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   searchTerm: string;
//   setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
//   setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   todos: Todo[];
//   setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
// }

const Header: React.FC<HeaderProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  searchTerm,
  setSearchTerm,
  setIsSettingsOpen,
  todos,
  setTodos,
}) => {
  // const { theme } = useTheme(); // 現在のテーマを取得(未使用)
  const navigate = useNavigate();

  // AuthContextからisSignedInとsetIsSignedInを受け取る
  const { isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const [userAvatar, setUserAvatar] = useState("/default-avatar.png");

  // ユーザーのアイコンを取得
  const fetchUserAvatar = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/users/me",
        {
          headers: {
            "access-token": Cookies.get("_access_token") || "",
            client: Cookies.get("_client") || "",
            uid: Cookies.get("_uid") || "",
          },
        }
      );
      setUserAvatar(response.data.avatar_url || "/default-avatar.png");
    } catch (error) {
      console.error("アイコンの取得に失敗しました:", error);
    }
  };

  useEffect(() => {
    if (isSignedIn) fetchUserAvatar();
  }, [isSignedIn]);

  const handleSignOut = async () => {
    try {
      const res = await signOut();
      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");
        setIsSignedIn(false);
        navigate("/signin");
        setTodos([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Headerコンポーネントの描画
  return (
    <header className="fixed top-0 left-0 right-0 bg-light-header dark:bg-dark-header text-white p-4 shadow-md z-40">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {isSignedIn && (
            <button
              className="mr-2 md:hidden text-light-text dark:text-dark-text"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
          <h1 className="text-2xl font-bold">Todo App</h1>
        </div>
        <div className="flex items-center">
          {isSignedIn ? (
            <>
              <div className="relative md:hidden">
                <input
                  type="search"
                  placeholder="検索"
                  className="py-1 px-2 rounded text-black bg-light-input dark:bg-dark-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>
              <nav className="hidden md:flex items-center space-x-5">
                <Link to="/" className="hover:text-blue-200">
                  ホーム
                </Link>
                <Link to="/notifications" className="hover:text-blue-200">
                  お知らせ
                </Link>
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="hover:text-blue-200 flex items-center"
                >
                  設定
                  <SettingsIcon className="ml-1" size={18} />
                </button>
                <img
                  src={userAvatar}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border"
                />
                <button onClick={handleSignOut} className="hover:text-blue-200">
                  ログアウト
                </button>
              </nav>
            </>
          ) : (
            <nav className="flex items-center space-x-5">
              <Link to="/signin" className="hover:text-blue-200">
                サインイン
              </Link>
              <Link to="/signup" className="hover:text-blue-200">
                サインアップ
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
