"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Key, CheckCircle, AlertCircle, AlertTriangle, LoaderCircle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function VerifyCode() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const [code, setCode] = useState("");
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

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email) {
      setToastMessage("Missing email address. Please start over.");
      setToastType("error");
      setShowToast(true);
      return;
    }

    if (!code) {
      setToastMessage("Please enter the verification code.");
      setToastType("error");
      setShowToast(true);
      return;
    }

    // Validate code format (6-digit number)
    if (!/^\d{6}$/.test(code)) {
      setToastMessage("Verification code must be a 6-digit number.");
      setToastType("warning");
      setShowToast(true);
      return;
    }

    setLoading(true);
    try {
      const requestBody = { email, code };
      console.log("Sending request to /auth/verify-reset-code:", {
        url: `${API_URL}/auth/verify-reset-code`,
        body: requestBody,
      });

      const res = await fetch(`${API_URL}/auth/verify-reset-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const rawResponse = await res.text();
      console.log("API response:", rawResponse);

      let data;
      try {
        data = JSON.parse(rawResponse);
      } catch {
        data = {};
      }

      if (res.ok) {
        setToastMessage("🎉 Reset code verified! Redirecting to reset password...");
        setToastType("success");
        setShowToast(true);
        setCode("");
        setTimeout(() => {
          navigate(`/reset-password?email=${email}&code=${code}`);
        }, 1500);
      } else {
        if (res.status === 400 || res.status === 401) {
          if (data?.error?.toLowerCase().includes("invalid")) {
            setToastMessage("Invalid verification code.");
            setToastType("error");
          } else if (data?.error?.toLowerCase().includes("expired")) {
            setToastMessage("Verification code has expired. Please request a new one.");
            setToastType("warning");
          } else {
            setToastMessage(data?.error || "Verification failed. Please try again.");
            setToastType("error");
          }
        } else if (res.status === 404) {
          setToastMessage("Email not found. Please start over.");
          setToastType("error");
        } else {
          setToastMessage(data?.error || "Unexpected error during verification.");
          setToastType("error");
        }
        setShowToast(true);
      }
    } catch (err) {
      console.error("Error verifying reset code:", err);
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
          Verify Your Email
        </h1>

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="relative">
            <Key className="absolute left-3 top-3 text-white/80 w-5 h-5" />
            <input
              type="text"
              placeholder="Enter verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
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
                Verifying...
              </>
            ) : (
              "Verify Code"
            )}
          </motion.button>
        </form>

        <p className="text-white/70 text-center mt-6">
          Didn’t receive a code?{" "}
          <a
            href={`/forgot-password${email ? `?email=${email}` : ""}`}
            className="text-cyan-400 font-semibold hover:underline"
          >
            Resend
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