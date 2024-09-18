// Sidebar.tsx
import React from "react";
import { Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({
  setFilter,
  searchTerm,
  setSearchTerm,
  setIsMenuOpen,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleFilterClick = (filter: string) => {
    setFilter(filter);
    setIsMenuOpen(false);
    navigate(`/?filter=${filter}`);
  };

  const getButtonClass = (filter: string) => {
    const params = new URLSearchParams(location.search);
    const activeFilter = params.get("filter") || "all";
    return `flex items-center w-full text-left ${
      activeFilter === filter
        ? "bg-blue-200 text-blue-700"
        : "text-gray-700 hover:bg-blue-200"
    } p-2 rounded transition-colors`;
  };

  return (
    <div className="p-4">
      <div className="hidden md:block mb-4">
        <div className="relative">
          <input
            type="search"
            placeholder="検索"
            className="w-full p-2 pr-8 rounded bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
      </div>
      <ul className="space-y-2">
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
    </div>
  );
};
