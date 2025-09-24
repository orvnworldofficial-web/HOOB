import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User, CheckCircle, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [feedback, setFeedback] = useState("");

  const API_URL = import.meta.env.VITE_API_BASE;

  const handleSendCode = async (e) => {
    e.preventDefault();
    setFeedback("");

    // ✅ Guard: prevent submission if passwords don’t match
    if (password !== confirmPassword) {
      setFeedback("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/send-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password, role }),
      });
      const data = await res.json();
      if (res.ok) {
        setCodeSent(true);
        setFeedback(data.message);
      } else {
        setFeedback(data.error || "Failed to send code.");
      }
    } catch (err) {
      setFeedback("Something went wrong. Please try again.");
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setFeedback("");

    if (password !== confirmPassword) {
      setFeedback("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, name, password, role }),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback(data.message);
        setTimeout(() => {
          navigate("/signin");
        }, 1500);
      } else {
        setFeedback(data.error || "Verification failed.");
      }
    } catch (err) {
      setFeedback("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-futuristic min-h-screen flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md p-10 rounded-3xl bg-white/10 backdrop-blur-lg shadow-neon"
      >
        <h1 className="text-4xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
          Sign Up to HOOB
        </h1>
        <p className="text-gray-300 text-sm mb-6 text-center">
          Join Africa’s House of Builders. Learn, build, earn, and connect with creators across the continent.
        </p>

        {/* Role Selection */}
        <div className="flex justify-between mb-6">
          {["student", "SME"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`w-1/2 py-2 rounded-lg mx-1 font-semibold transition ${
                role === r
                  ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white"
                  : "bg-white/20 text-gray-200 hover:bg-white/30"
              }`}
            >
              {r === "student" ? "Student" : "SME"}
            </button>
          ))}
        </div>

        {!codeSent ? (
          <form onSubmit={handleSendCode} className="space-y-4">
            {/* Name Input */}
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-gray-300" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-300" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              />
            </div>

            {/* Password Inputs */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-300" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-300" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-300"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* ✅ Inline feedback */}
            {confirmPassword && password !== confirmPassword && (
              <p className="text-red-400 text-sm mt-1">
                Passwords do not match
              </p>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold shadow-lg transition"
            >
              Send Verification Code
            </motion.button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            {/* Verification Code Input */}
            <div className="relative">
              <CheckCircle className="absolute left-3 top-3 w-5 h-5 text-gray-300" />
              <input
                type="text"
                placeholder="Enter Verification Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold shadow-lg transition"
            >
              Verify & Complete Sign Up
            </motion.button>

            <p className="text-gray-400 text-sm text-center mt-2">
              Didn’t get a code?{" "}
              <button
                onClick={() => setCodeSent(false)}
                className="text-cyan-400 font-semibold hover:underline"
              >
                Resend
              </button>
            </p>
          </form>
        )}

        {feedback && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-sm text-green-400 text-center"
          >
            {feedback}
          </motion.p>
        )}

        <p className="mt-6 text-gray-400 text-sm text-center">
          Already have an account?{" "}
          <a href="/signin" className="text-cyan-400 font-semibold hover:underline">
            Sign In
          </a>
        </p>
      </motion.div>
    </div>
  );
}
