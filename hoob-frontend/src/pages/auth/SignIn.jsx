"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle, AlertTriangle, LoaderCircle } from "lucide-react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_BASE;
  const ADMIN_URL = import.meta.env.VITE_ADMIN_URL;

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !password) {
      setToastMessage("Please fill in all fields.");
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
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setToastMessage("🎉 Signed in successfully!");
        setToastType("success");
        setShowToast(true);
        setTimeout(() => {
          if (data.user?.role === "admin") {
            window.location.href = ADMIN_URL;
          } else {
            window.location.href = "/dashboard";
          }
        }, 1500);
      } else {
        if (res.status === 401 || data?.error?.toLowerCase().includes("invalid")) {
          setToastMessage("Invalid email or password.");
          setToastType("error");
        } else if (res.status === 400 && data?.error?.toLowerCase().includes("already")) {
          setToastMessage("This email is already registered.");
          setToastType("warning");
        } else {
          setToastMessage(data?.error || "Login failed.");
          setToastType("error");
        }
        setShowToast(true);
      }
    } catch (err) {
      console.error("Error during login:", err);
      setToastMessage("Error connecting to server.");
      setToastType("error");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-futuristic flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl p-10 shadow-neon border border-white/20"
      >
        <h1 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-600">
          Welcome Back
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-white/80 w-5 h-5" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition font-sans"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-white/80 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition font-sans"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-white/80"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            type="submit"
            disabled={loading || showToast}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold shadow-lg transition disabled:opacity-50 disabled:animate-pulse flex items-center justify-center"
          >
            {loading ? (
              <>
                <LoaderCircle className="w-5 h-5 mr-2 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
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
          <a href="/signup" className="text-cyan-400 font-semibold hover:underline">
            Sign Up
          </a>
        </p>

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
      </motion.div>
    </div>
  );
}
