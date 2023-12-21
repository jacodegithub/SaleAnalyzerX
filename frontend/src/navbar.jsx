// Navbar.js
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 p-4 fixed w-full top-0">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-white text-2xl font-bold">SaleAnalyzeX</div>
          <div className="hidden md:flex space-x-4">
            <a href="#" className="text-white">Home</a>
            <a href="#" className="text-white">About</a>
            <a href="#" className="text-white">Services</a>
            <a href="#" className="text-white">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
