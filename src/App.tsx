import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TodoList } from "./components/TodoList";
import { TodoForm } from "./components/TodoForm";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Notifications from "./components/Notifications";
import Settings from "./components/Settings";
import Profile from "./components/Profile";
import { getTodos } from "./lib/api/todos";
import { Todo } from "./interfaces/index";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const handleGetTodos = async () => {
    try {
      const res = await getTodos();
      console.log(res);

      if (res?.status === 200) {
        setTodos(res.data.todos);
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

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-blue-50 pt-16">
        <Header />
        <div className="flex flex-1">
          <Sidebar todos={todos} setFilteredTodos={setFilteredTodos} />
          <div className="flex flex-col flex-1">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <TodoForm todos={todos} setTodos={setTodos} />
                    <TodoList todos={filteredTodos} setTodos={setTodos} />
                  </>
                }
              />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
