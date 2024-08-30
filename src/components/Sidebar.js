import React, { useState, useEffect, useCallback } from "react";
import { Todo } from "../interfaces/index";

interface SidebarProps {
  todos: Todo[];
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

function Sidebar({ todos, setFilteredTodos }: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filterTodos = useCallback(
    (filter: string) => {
      let filteredTodos = todos;

      // Apply filter
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

      // Apply search
      if (searchTerm) {
        filteredTodos = filteredTodos.filter((todo) =>
          todo.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredTodos(filteredTodos);
      setActiveFilter(filter);
    },
    [todos, searchTerm, setFilteredTodos]
  );

  useEffect(() => {
    filterTodos(activeFilter);
  }, [todos, activeFilter, searchTerm, filterTodos]);

  return (
    <aside className="w-60 bg-blue-100 p-4 shadow-md z-10">
      <div className="sticky top-4">
        <div className="mb-4">
          <input
            type="search"
            placeholder="検索"
            className="w-full p-2 rounded bg-white hover:bg-gray-200 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className="w-full mt-4 mb-4 space-y-2">
            <li>
              <button
                onClick={() => filterTodos("all")}
                className={`flex items-center w-full text-left ${
                  activeFilter === "all"
                    ? "bg-blue-200 text-blue-700"
                    : "text-gray-700 hover:bg-blue-200"
                } p-2 rounded transition-colors`}
              >
                すべてのタスク
              </button>
            </li>
            <li>
              <button
                onClick={() => filterTodos("today")}
                className={`flex items-center w-full text-left ${
                  activeFilter === "today"
                    ? "bg-blue-200 text-blue-700"
                    : "text-gray-700 hover:bg-blue-200"
                } p-2 rounded transition-colors`}
              >
                今日の予定
              </button>
            </li>
            <li>
              <button
                onClick={() => filterTodos("important")}
                className={`flex items-center w-full text-left ${
                  activeFilter === "important"
                    ? "bg-blue-200 text-blue-700"
                    : "text-gray-700 hover:bg-blue-200"
                } p-2 rounded transition-colors`}
              >
                重要
              </button>
            </li>
            <li>
              <button
                onClick={() => filterTodos("completed")}
                className={`flex items-center w-full text-left ${
                  activeFilter === "completed"
                    ? "bg-blue-200 text-blue-700"
                    : "text-gray-700 hover:bg-blue-200"
                } p-2 rounded transition-colors`}
              >
                完了済み
              </button>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
