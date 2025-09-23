"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle, AlertCircle, AlertTriangle, LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleSendCode = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setToastMessage("Please enter an email address.");
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
      const res = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (res.ok) {
        setToastMessage("🎉 Verification code sent to your email!");
        setToastType("success");
        setShowToast(true);
        setEmail("");
        setTimeout(() => {
          navigate(`/verify-code?email=${email}`);
        }, 1500);
      } else {
        if (res.status === 400 && data?.error?.toLowerCase().includes("not found")) {
          setToastMessage("This email is not registered.");
          setToastType("warning");
        } else {
          setToastMessage(data?.error || "Failed to send verification code.");
          setToastType("error");
        }
        setShowToast(true);
      }
    } catch (err) {
      console.error("Error sending verification code:", err);
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
          Forgot Password
        </h1>

        <form onSubmit={handleSendCode} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-white/80 w-5 h-5" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition font-sans"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            type="submit"
            disabled={loading || showToast}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold shadow-lg transition disabled:opacity-50 disabled:animate-pulse flex items-center justify-center"
          >
            {loading ? (
              <>
                <LoaderCircle className="w-5 h-5 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Verification Code"
            )}
          </motion.button>
        </form>

        <p className="text-white/70 text-center mt-6">
          Remember your password?{" "}
          <a href="/signin" className="text-cyan-400 font-semibold hover:underline">
            Sign In
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
