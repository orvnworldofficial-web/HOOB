"use client";

import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";

export default function SignIn() {
  return (
    <div className="min-h-screen bg-futuristic flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl p-10 shadow-lg border border-white/20"
      >
        <h1 className="text-4xl font-extrabold text-white text-center mb-8">
          Welcome Back
        </h1>

        <form className="space-y-6">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-white/80" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-white/80" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-400 to-cyan-400 text-white font-bold shadow-lg"
          >
            Sign In
          </motion.button>
        </form>

        <p className="text-white/70 text-center mt-6">
          Forgot your password?{" "}
          <a href="/forgot-password" className="text-cyan-400 font-semibold hover:underline">
            Reset it
          </a>
        </p>

        <p className="text-white/70 text-center mt-2">
          Don’t have an account?{" "}
          <a href="/signup" className="text-purple-400 font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </motion.div>
    </div>
  );
}
