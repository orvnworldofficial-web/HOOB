"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, Info, Briefcase, Phone, UserPlus, LogIn } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-3 
      bg-white/10 backdrop-blur-md shadow-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <Link to="/" className="text-2xl font-extrabold text-white tracking-wider">
          HOOB<span className="text-blue-400">.</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-white items-center">
          <Link to="/" className="flex items-center gap-1 hover:text-blue-400 transition">
            <Home size={18} /> Home
          </Link>
          <Link to="/about" className="flex items-center gap-1 hover:text-blue-400 transition">
            <Info size={18} /> About
          </Link>
          <Link to="/services" className="flex items-center gap-1 hover:text-blue-400 transition">
            <Briefcase size={18} /> Services
          </Link>
          <Link to="/contact" className="flex items-center gap-1 hover:text-blue-400 transition">
            <Phone size={18} /> Contact
          </Link>
        </div>

        {/* Desktop Call to Action Buttons */}
        {/*
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/signin"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600
            text-white font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 
            text-white font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Sign Up
          </Link>
        </div>
        */}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden mt-3 flex flex-col space-y-3 text-white bg-white/10 backdrop-blur-md rounded-lg p-4">
          <Link to="/" onClick={toggleMenu} className="flex items-center gap-2 px-3 py-2 hover:bg-white/20 rounded-md transition">
            <Home size={18} /> Home
          </Link>
          <Link to="/about" onClick={toggleMenu} className="flex items-center gap-2 px-3 py-2 hover:bg-white/20 rounded-md transition">
            <Info size={18} /> About
          </Link>
          <Link to="/services" onClick={toggleMenu} className="flex items-center gap-2 px-3 py-2 hover:bg-white/20 rounded-md transition">
            <Briefcase size={18} /> Services
          </Link>
          <Link to="/contact" onClick={toggleMenu} className="flex items-center gap-2 px-3 py-2 hover:bg-white/20 rounded-md transition">
            <Phone size={18} /> Contact
          </Link>
          {/*
          <div className="border-t border-white/20 pt-3 mt-3 space-y-3">
            <Link
              to="/signin"
              onClick={toggleMenu}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-md text-center hover:scale-105 transition-transform"
            >
              <LogIn size={18} /> Sign In
            </Link>
            <Link
              to="/signup"
              onClick={toggleMenu}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md text-center hover:scale-105 transition-transform"
            >
              <UserPlus size={18} /> Sign Up
            </Link>
          </div>
          */}
        </div>
      )}
    </nav>
  );
}