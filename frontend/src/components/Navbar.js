import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import authService from '../services/authService';
import { Dialog } from '@headlessui/react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  const isActive = (path) => location.pathname === path ? 'bg-blue-800 text-white' : 'text-gray-800 hover:bg-blue-100';

  return (
    <nav className="bg-blue-800 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-2xl font-bold hover:text-blue-200 transition-colors">Invoice Management System</Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className={`px-4 py-2 rounded-md text-lg font-semibold ${isActive('/')}`}>Home</Link>
          <Link to="/dashboard" className={`px-4 py-2 rounded-md text-lg font-semibold ${isActive('/dashboard')}`}>Dashboard</Link>
          <Link to="/invoices" className={`px-4 py-2 rounded-md text-lg font-semibold ${isActive('/invoices')}`}>Invoices</Link>
          <button onClick={handleLogout} className="px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors">Logout</button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(true)} className="text-white focus:outline-none">
            <FaBars className="w-8 h-8" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75">
        <div className="relative flex flex-col h-full bg-white p-6">
          <div className="flex justify-end mb-6">
            <button onClick={() => setIsOpen(false)} className="text-gray-700 focus:outline-none">
              <FaTimes className="w-8 h-8" />
            </button>
          </div>
          <div className="flex flex-col space-y-6">
            <Link to="/" className={`text-2xl font-semibold ${isActive('/')}`} onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/dashboard" className={`text-2xl font-semibold ${isActive('/dashboard')}`} onClick={() => setIsOpen(false)}>Dashboard</Link>
            <Link to="/invoices" className={`text-2xl font-semibold ${isActive('/invoices')}`} onClick={() => setIsOpen(false)}>Invoices</Link>
            <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-2xl font-semibold text-red-600 hover:text-red-700">Logout</button>
          </div>
        </div>
      </Dialog>
    </nav>
  );
};

export default Navbar;
