import React from "react";

function Sidebar() {
  return (
    <aside className="w-60 bg-blue-100 p-4 shadow-md z-10">
      <div className="sticky top-4">
        <div className="fixed mb-4">
          <input
            type="search"
            placeholder="検索"
            className="w-full p-2 rounded bg-white hover:bg-gray-200 transition-colors"
          />
          <ul className="w-full mt-4 mb-4 space-y-2">
            <li>
              <a
                href="#"
                className="flex items-center text-gray-700 hover:bg-blue-200 p-2 rounded transition-colors"
              >
                すべてのタスク
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center text-gray-700 hover:bg-blue-200 p-2 rounded transition-colors"
              >
                今日の予定
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center text-gray-700 hover:bg-blue-200 p-2 rounded transition-colors"
              >
                重要
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center text-gray-700 hover:bg-blue-200 p-2 rounded transition-colors"
              >
                完了済み
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
