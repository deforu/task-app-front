import React from 'react';

function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Todo App</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-blue-200">Dashboard</a></li>
            <li><a href="#" className="hover:text-blue-200">Tasks</a></li>
            <li><a href="#" className="hover:text-blue-200">Settings</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;