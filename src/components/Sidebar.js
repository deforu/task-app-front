import React from 'react';

function Sidebar() {
  return (
    <aside className="w-64 bg-blue-100 p-4 shadow-md z-10">
      <div className="sticky top-4">
        <h2 className="text-xl font-semibold mb-4">ホーム</h2>
        <ul className="space-y-2">
          <li><a href="#" className="text-blue-600 hover:text-blue-800">すべてのタスク</a></li>
          <li><a href="#" className="text-blue-600 hover:text-blue-800">今日の予定</a></li>
          <li><a href="#" className="text-blue-600 hover:text-blue-800">重要</a></li>
          <li><a href="#" className="text-blue-600 hover:text-blue-800">完了済み</a></li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
