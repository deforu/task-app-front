import React from 'react';

function Footer() {
  return (
    <footer className="bg-blue-600 text-white p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Todo App. All rights reserved.</p>
        <div className="mt-2">
          <a href="#" className="hover:text-blue-200 mr-4">Privacy Policy</a>
          <a href="#" className="hover:text-blue-200 mr-4">Terms of Service</a>
          <a href="#" className="hover:text-blue-200">Contact Us</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
