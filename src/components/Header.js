import React from "react";

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-blue-600 text-white p-4 shadow-md z-50">
      <div className="mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Todo App</h1>
        <nav>
          <ul className="flex space-x-5">
            <li>
              <a href="#" className="hover:text-blue-200">
                お知らせ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-200">
                設定
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-200">
                プロフィール
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
