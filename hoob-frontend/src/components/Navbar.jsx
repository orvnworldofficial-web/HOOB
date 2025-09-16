// src/components/Navbar.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, Info, Briefcase, Phone } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-3 
      bg-white/10 backdrop-blur-md shadow-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <Link to="/" className="text-2xl font-extrabold text-white tracking-wider">
          HOOB<span className="text-blue-400">.</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-white">
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

        {/* Call to Action */}
        <div className="hidden md:block">
          <Link
            to="/signup"
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 
            text-white font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Join Us 🚀
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden mt-3 flex flex-col space-y-3 text-white bg-white/10 backdrop-blur-md rounded-lg p-4">
          <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
            <Home size={18} /> Home
          </Link>
          <Link to="/about" onClick={() => setOpen(false)} className="flex items-center gap-2">
            <Info size={18} /> About
          </Link>
          <Link to="/services" onClick={() => setOpen(false)} className="flex items-center gap-2">
            <Briefcase size={18} /> Services
          </Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="flex items-center gap-2">
            <Phone size={18} /> Contact
          </Link>
          <Link
            to="/signup"
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 
            text-white font-semibold shadow-md mt-2 text-center"
          >
            Join Us 🚀
          </Link>
        </div>
      )}
    </nav>
  );
}
