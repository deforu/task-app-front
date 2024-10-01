// App.tsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { TodoList } from "./components/TodoList";
import { TodoForm } from "./components/TodoForm";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import Notifications from "./components/Notifications";
import Settings from "./components/Settings";
import Modal from "./components/Modal";
import { getTodos } from "./lib/api/todos";
import { Todo } from "./interfaces/index";
import { Home, Bell, Settings as SettingsIcon } from "lucide-react";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const handleGetTodos = async () => {
    try {
      const res = await getTodos();
      if (res?.status === 200) {
        const sortedTodos = res.data.todos.sort((a: Todo, b: Todo) => {
          if (a.created_at && b.created_at) {
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          } else {
            return b.id - a.id;
          }
        });
        setTodos(sortedTodos);
      } else {
        console.log(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetTodos();
  }, []);

  const TodoContent = () => (
    <>
      <div className="hidden md:block">
        <TodoForm todos={todos} setTodos={setTodos} />
      </div>
      <TodoList
        todos={todos}
        setTodos={setTodos}
        filter={filter}
        searchTerm={searchTerm}
      />
      <div className="md:hidden fixed bottom-10 left-0 right-0 z-40">
        <TodoForm todos={todos} setTodos={setTodos} />
      </div>
    </>
  );

  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-light-body dark:bg-dark-body">
          <Header
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setIsSettingsOpen={setIsSettingsOpen}
          />
          <div className="flex flex-1">
            <div
              className={`fixed inset-y-0 left-0 z-30 w-60 bg-blue-100 shadow-md transform ${
                isMenuOpen ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300 ease-in-out md:sticky md:translate-x-0 top-16 h-[calc(100vh-4rem)]`}
            >
              <Sidebar
                setFilter={setFilter}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setIsMenuOpen={setIsMenuOpen}
              />
            </div>
            <div className="flex-1">
              <div className="pt-16 pb-32 md:pb-16">
                <Routes>
                  <Route path="/" element={<TodoContent />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route
                    path="/settings"
                    element={
                      <div className="md:hidden">
                        <Settings />
                      </div>
                    }
                  />
                </Routes>
              </div>
            </div>
          </div>
          <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-blue-600 text-white p-2 shadow-md z-50">
            <nav>
              <ul className="flex justify-around">
                <li>
                  <Link to="/">
                    <Home size={24} />
                  </Link>
                </li>
                <li>
                  <Link to="/notifications">
                    <Bell size={24} />
                  </Link>
                </li>
                <li>
                  <Link to="/settings">
                    <SettingsIcon size={24} />
                  </Link>
                </li>
              </ul>
            </nav>
          </footer>
          <Modal
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
          >
            <Settings />
          </Modal>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
