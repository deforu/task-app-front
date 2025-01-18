// src/components/Sidebar.tsx
import React from "react";
import { Search, MoreHorizontal } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { Folder } from "../interfaces"; // 共通のFolderインターフェースをインポート

interface SidebarProps {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;

  // フォルダ一覧と操作用の関数
  folders: Folder[];
  onOpenCreateFolder: () => void;
  onOpenEditFolder: (folder: Folder) => void;

  // フォルダ選択用の関数と選択状態
  onSelectFolder: (folder: Folder | null) => void;
  selectedFolder: Folder | null;
}

export const Sidebar: React.FC<SidebarProps> = ({
  setFilter,
  searchTerm,
  setSearchTerm,
  setIsMenuOpen,
  folders,
  onOpenCreateFolder,
  onOpenEditFolder,
  onSelectFolder,
  selectedFolder,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const handleFilterClick = (filter: string) => {
    setFilter(filter);
    setIsMenuOpen(false);
    navigate(`/?filter=${filter}`);
    onSelectFolder(null); // フィルタを選択したらフォルダ選択を解除
  };

  const getButtonClass = (filter: string) => {
    const params = new URLSearchParams(location.search);
    const activeFilter = params.get("filter") || "all";
    return `flex items-center w-full text-left ${
      activeFilter === filter
        ? "bg-light-hover dark:bg-dark-hover text-light-text dark:text-dark-text"
        : "text-light-text dark:text-dark-text hover:bg-light-hover dark:hover:bg-dark-hover"
    } p-2 rounded transition-colors`;
  };

  const handleFolderClick = (folder: Folder | null) => {
    onSelectFolder(folder);
    setIsMenuOpen(false);
    // ナビゲーションを追加する場合はここに記述
    // 例: navigate(`/folders/${folder?.id}`);
  };

  return (
    <div className="p-4 h-full bg-light-card dark:bg-dark-card overflow-y-auto">
      <div className="hidden md:block mb-4">
        <div className="relative">
          <input
            type="search"
            placeholder="検索"
            className="w-full p-2 pr-8 rounded bg-light-input dark:bg-dark-input text-light-text dark:text-dark-text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
      </div>

      <ul className="space-y-2 mb-4">
        <li>
          <button
            onClick={() => handleFilterClick("all")}
            className={getButtonClass("all")}
          >
            すべてのタスク
          </button>
        </li>
        <li>
          <button
            onClick={() => handleFilterClick("today")}
            className={getButtonClass("today")}
          >
            今日の予定
          </button>
        </li>
        <li>
          <button
            onClick={() => handleFilterClick("important")}
            className={getButtonClass("important")}
          >
            重要
          </button>
        </li>
        <li>
          <button
            onClick={() => handleFilterClick("completed")}
            className={getButtonClass("completed")}
          >
            完了済み
          </button>
        </li>
      </ul>

      {/* フォルダを作るボタン */}
      <button
        className="w-full bg-blue-500 text-white py-2 px-4 rounded mb-4"
        onClick={onOpenCreateFolder}
      >
        フォルダを作る
      </button>

      {/* フォルダ一覧 */}
      <ul className="mt-4 space-y-2">
        {/* 「すべてのフォルダ」を選択するオプション */}
        {/* <li>
          <button
            onClick={() => handleFolderClick(null)}
            className={`flex items-center w-full text-left p-2 rounded transition-colors ${
              selectedFolder === null
                ? "bg-light-hover dark:bg-dark-hover text-light-text dark:text-dark-text"
                : "text-light-text dark:text-dark-text hover:bg-light-hover dark:hover:bg-dark-hover"
            }`}
          >
            すべてのフォルダ
          </button>
        </li> */}

        {folders.map((folder) => (
          <li key={folder.id}>
            <div
              className={`flex items-center w-full text-light-text dark:text-dark-text
              hover:bg-light-hover dark:hover:bg-dark-hover
              p-2 rounded transition-colors cursor-pointer
              ${
                selectedFolder?.id === folder.id
                  ? "bg-light-hover dark:bg-dark-hover text-light-text dark:text-dark-text"
                  : ""
              }`}
              onClick={() => handleFolderClick(folder)}
            >
              <span className="mr-auto">{folder.name}</span>
              {/* 点々ボタン → 編集モーダルを開く */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // 親のonClickを防ぐ
                  onOpenEditFolder(folder);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <MoreHorizontal size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* サイドバーを閉じるボタン */}
      <div className="mt-8">
        <button
          onClick={() => setIsMenuOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          閉じる
        </button>
      </div>
    </div>
  );
};
