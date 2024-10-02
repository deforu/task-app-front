// Header.js
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, Settings as SettingsIcon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext"; // ThemeContextをインポート
import { AuthContext } from "../App"; // AuthContextをインポート
import { signOut } from "../lib/api/auth";
import Cookies from "js-cookie";

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  searchTerm,
  setSearchTerm,
  setIsSettingsOpen,
}) => {
  const { theme } = useTheme(); // 現在のテーマを取得
  const navigate = useNavigate();

  const { loading, isSignedIn, setIsSignedIn, currentUser } =
    useContext(AuthContext);

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

        console.log("Succeeded in sign out");
      } else {
        console.log("Failed in sign out");
      }
    } catch (err) {
      console.log(err);
    }
  };

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
