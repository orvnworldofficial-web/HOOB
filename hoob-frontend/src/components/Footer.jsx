"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Coffee,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setToastMessage("Please enter an email before submitting");
      setToastType("error");
      setShowToast(true);
      return;
    }
    if (!emailRegex.test(email)) {
      setToastMessage("Please enter a valid email address.");
      setToastType("warning");
      setShowToast(true);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        if (res.status === 400 && data?.message?.toLowerCase().includes("already")) {
          setToastMessage("You’re already on the waitlist!");
          setToastType("warning");
        } else {
          setToastMessage(data?.message || "Email already registered or invalid.");
          setToastType("error");
        }
        setShowToast(true);
        setLoading(false);
        return;
      }

      setToastMessage("🎉 You're on the waitlist!");
      setToastType("success");
      setShowToast(true);
      setEmail("");
      setLoading(false);
    } catch (error) {
      console.error("Error submitting waitlist:", error);
      setToastMessage("Something went wrong. Please try again later.");
      setToastType("error");
      setShowToast(true);
      setLoading(false);
    }
  };

  return (
    <footer className="bg-futuristic text-white relative overflow-hidden pt-20 pb-10 px-6 md:px-20">
      {/* Decorative glowing shapes */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 rounded-full bg-purple-700/20 blur-3xl animate-pulseGlow pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-72 h-72 rounded-full bg-cyan-500/20 blur-3xl animate-pulseGlow pointer-events-none"></div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 relative z-10">
        {/* Branding */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
            HOOB
          </h2>
          <p className="text-gray-300">
            Africa’s House of Builders. Learn, grow, collaborate, and create
            impact with ORA and E.A.R.N at your side.
          </p>
          <div className="flex items-center gap-3 text-gray-300 mt-4">
            <Coffee className="w-5 h-5" />
            <span>Building the future, one creator at a time</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="/" className="hover:text-cyan-400 transition">Home</a>
            </li>
            <li>
              <a href="/about" className="hover:text-cyan-400 transition">About</a>
            </li>
            <li>
              <a href="/services" className="hover:text-cyan-400 transition">Services</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-cyan-400 transition">Contact</a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-2">Contact</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center gap-2">
              <Mail className="w-5 h-5" /> orvnworldofficial@gmail.com
            </li>
            <li>+234 800 123 4567</li>
            <li>Lagos, Nigeria</li>
          </ul>
          <div className="flex items-center gap-4 mt-4 text-gray-300">
            <a href="#" className="hover:text-cyan-400 transition"><Facebook className="w-6 h-6" /></a>
            <a href="#" className="hover:text-cyan-400 transition"><Twitter className="w-6 h-6" /></a>
            <a href="#" className="hover:text-cyan-400 transition"><Instagram className="w-6 h-6" /></a>
            <a href="#" className="hover:text-cyan-400 transition"><Linkedin className="w-6 h-6" /></a>
          </div>
        </div>

        {/* Waitlist Form */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-2">Join Our Waitlist</h3>
          <p className="text-gray-300">
            Be the first to access HOOB’s ecosystem. Get early updates and personalized insights from ORA.
          </p>
          <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-3 mt-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-full bg-white/10 backdrop-blur-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              disabled={loading || showToast}
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-semibold text-white shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:animate-pulse"
            >
              {loading ? "Adding to waitlist..." : "🚀 Join Waitlist"}
            </motion.button>
          </form>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`fixed top-4 right-4 max-w-xs w-full p-4 rounded-lg shadow-neon backdrop-blur-md bg-glass border border-glass z-50 ${
            toastType === "success"
              ? "bg-green-500/20 text-green-100"
              : toastType === "error"
              ? "bg-red-500/20 text-red-100"
              : "bg-yellow-500/20 text-yellow-100"
          }`}
        >
          <div className="flex items-center">
            {toastType === "success" && (
              <CheckCircle className="w-6 h-6 mr-3 text-green-400" />
            )}
            {toastType === "error" && (
              <AlertCircle className="w-6 h-6 mr-3 text-red-400" />
            )}
            {toastType === "warning" && (
              <AlertTriangle className="w-6 h-6 mr-3 text-yellow-400" />
            )}
            <p className="text-sm font-sans flex-1">{toastMessage}</p>
            <button
              onClick={() => setShowToast(false)}
              className="ml-3 text-neutral hover:text-primary-400 transition"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}

      {/* Bottom Bar */}
      <div className="mt-16 border-t border-white/20 pt-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} HOOB. All rights reserved. Powered by ORVN
      </div>
    </footer>
  );
}