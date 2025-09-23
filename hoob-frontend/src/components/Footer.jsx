"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Coffee,
  CheckCircle,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSuccess(true);
        setEmail("");
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong. Try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
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

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-2">Join Our Movement</h3>
          <p className="text-gray-300">
            Stay updated on new opportunities, challenges, and courses. ORA will even help personalize your journey.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 mt-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              required
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              disabled={loading}
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-semibold text-white shadow-lg disabled:opacity-50"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </motion.button>
          </form>

          {success && (
            <p className="flex items-center gap-2 text-green-400 mt-2 text-sm">
              <CheckCircle className="w-4 h-4" /> You’re subscribed! Check your inbox.
            </p>
          )}
          {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-16 border-t border-white/20 pt-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} HOOB. All rights reserved. Built with passion, AI, and futuristic vibes.
      </div>
    </footer>
  );
}
