import React, { useState } from "react";
import { createTodo } from "../lib/api/todos";
import { Todo } from "../interfaces/index";

interface TodoFormProps {
  todos: Todo[];
  setTodos: Function;
}

export const TodoForm: React.FC<TodoFormProps> = ({ todos, setTodos }) => {
  const [title, setTitle] = useState<string>("");

  const handleCreateTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: Todo = {
      title: title,
      completed: false,
    };

    try {
      const res = await createTodo(data);
      console.log(res);

      if (res.status === 200) {
        setTodos([...todos, res.data.todo]);
      } else {
        console.log(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }

    setTitle("");
  };

  return (
    <div className="fixed flex items-center w-full p-4 bg-white shadow-md z-10">
      <div className="w-full max-w-2xl p-4">
        <form
          onSubmit={handleCreateTodo}
          className="bg-white shadow-md rounded-lg"
        >
          <input
            type="text"
            value={title}
            placeholder="タスクを入力"
            className="w-full bg-blue-100 hover:bg-gray-100 p-3 rounded-lg p-2"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
        </form>
      </div>
    </div>
  );
};
