import React from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const Header: React.FC<HeaderProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-blue-600 text-white p-4 shadow-md z-40">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <button
            className="mr-2 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-2xl font-bold">Todo App</h1>
        </div>
        <div className="flex items-center">
          <div className="relative md:hidden">
            <input
              type="search"
              placeholder="検索"
              className="py-1 px-2 rounded text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-5">
              <li>
                <Link to="/" className="hover:text-blue-200">
                  ホーム
                </Link>
              </li>
              <li>
                <Link to="/notifications" className="hover:text-blue-200">
                  お知らせ
                </Link>
              </li>
              <li>
                <Link to="/settings" className="hover:text-blue-200">
                  設定
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-blue-200">
                  プロフィール
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
