import React, { useEffect, useCallback } from "react";
import { Todo } from "../interfaces/index";
import { Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { getTodos } from "./../lib/api/todos";

interface SidebarProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({
  todos,
  setTodos,
  setFilteredTodos,
  searchTerm,
  setSearchTerm,
  setIsMenuOpen,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGetTodos = useCallback(async () => {
    try {
      const res = await getTodos();
      if (res?.status === 200) {
        setTodos(res.data.todos);
        return res.data.todos;
      } else {
        console.log(res.data.message);
        return [];
      }
    } catch (err) {
      console.log(err);
      return [];
    }
  }, [setTodos]);

  const filterTodos = useCallback(
    async (filter: string) => {
      let filteredTodos = todos;

      if (filter === "all") {
        filteredTodos = await handleGetTodos();
      } else {
        switch (filter) {
          case "today":
            const today = new Date().toISOString().split("T")[0];
            filteredTodos = todos.filter((todo) => todo.due_date === today);
            break;
          case "important":
            filteredTodos = todos.filter((todo) => todo.is_important);
            break;
          case "completed":
            filteredTodos = todos.filter((todo) => todo.completed);
            break;
          default:
            break;
        }
      }

      if (searchTerm) {
        filteredTodos = filteredTodos.filter((todo) =>
          todo.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredTodos(filteredTodos);
      setIsMenuOpen(false);
    },
    [todos, searchTerm, setFilteredTodos, setIsMenuOpen, handleGetTodos]
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const filter = params.get("filter") || "all";
    filterTodos(filter);
  }, [location.search, filterTodos]);

  const handleFilterClick = (filter: string) => {
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
