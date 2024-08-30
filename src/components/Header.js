import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-blue-600 text-white p-4 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Todo App</h1>
        <nav>
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
    </header>
  );
};

export default Header;
