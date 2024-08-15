import React from 'react';

function MainContent() {
  <ul className="space-y-2">
        <TaskItem text="Complete project proposal" />
        <TaskItem text="Review team's progress" />
        <TaskItem text="Prepare for tomorrow's meeting" />
      </ul>

  return (
    <main className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-4">Today's Tasks</h2>
      <p className="text-gray-600 mb-4">Date: {today}</p>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Add new task"
          className="w-full p-2 border border-blue-300 rounded"
        />
      </div>
      <ul className="space-y-2">
        <TaskItem text="Complete project proposal" />
        <TaskItem text="Review team's progress" />
        <TaskItem text="Prepare for tomorrow's meeting" />
      </ul>
    </main>
  );
}

function TaskItem({ text }) {
  return (
    <li className="flex items-center bg-white p-4 shadow rounded">
      <input type="checkbox" className="mr-4" />
      <span className="flex-1">{text}</span>
      <button className="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
      <button className="text-red-500 hover:text-red-700">Delete</button>
    </li>
  );
}

export default MainContent;
