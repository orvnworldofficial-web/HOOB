"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Bot,
  GraduationCap,
  Briefcase,
  Users,
  Wallet,
  Sparkles,
  Globe,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";

export default function Home() {
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
      console.log("Submitting email:", email);
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
    <div className="bg-futuristic min-h-screen text-white font-sans">
      <section className="relative flex flex-col items-center justify-center text-center py-28 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
        >
          HOOB — Growth Hub for Creators, SMEs, Freelancers & Students
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 max-w-3xl text-lg md:text-xl text-gray-200"
        >
          A connected ecosystem powered by{" "}
          <span className="text-cyan-400 font-semibold">ORA AI</span> and{" "}
          <span className="text-purple-400 font-semibold">E.A.R.N</span>,
          helping you learn, earn, automate, and grow—all in one place.
        </motion.p>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto"
          onSubmit={handleWaitlistSubmit}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email to join early access"
            className="flex-1 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            required
          />
          <button
            type="submit"
            disabled={loading || showToast}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-semibold shadow-lg hover:scale-105 transform transition disabled:opacity-50 disabled:animate-pulse"
          >
            {loading ? "Adding to waitlist..." : "🚀 Join Waitlist"}
          </button>
        </motion.form>
      </section>
      <section className="px-6 md:px-20 py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-xl bg-white/5 rounded-2xl shadow-lg p-10"
        >
          <h2 className="text-4xl font-bold text-cyan-400 mb-6">
            What is HOOB?
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            HOOB is where opportunity meets growth. Freelancers find gigs.
            Creators grow audiences. SMEs automate operations. Students learn
            monetizable skills. Connected by{" "}
            <span className="text-cyan-400 font-semibold">ORA AI</span> and
            powered by{" "}
            <span className="text-purple-400 font-semibold">E.A.R.N</span>, HOOB
            helps you work smarter, not harder.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/services"
            className="mt-6 inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-semibold shadow-lg"
          >
            💡 Explore the Ecosystem <ArrowRight className="ml-2 w-5 h-5" />
          </motion.a>
        </motion.div>
      </section>
      <section className="px-6 md:px-20 py-16 grid md:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-xl bg-white/5 rounded-2xl shadow-lg p-10"
        >
          <div className="flex items-center mb-4">
            <Bot className="w-12 h-12 text-cyan-400 mr-3" />
            <h2 className="text-3xl font-bold text-cyan-400">Meet ORA</h2>
          </div>
          <p className="text-lg text-gray-300 leading-relaxed">
            ORA isn’t just an AI assistant. She guides users through courses,
            recommends jobs, keeps streaks alive, and personalizes every step of
            your journey.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-xl bg-white/5 rounded-2xl shadow-lg p-10"
        >
          <div className="flex items-center mb-4">
            <Sparkles className="w-12 h-12 text-purple-400 mr-3" />
            <h2 className="text-3xl font-bold text-purple-400">
              Powered by E.A.R.N
            </h2>
          </div>
          <p className="text-lg text-gray-300 leading-relaxed">
            E.A.R.N connects every feature in HOOB — job applications, wallet
            transactions, course progress, and community engagement — seamlessly.
          </p>
        </motion.div>
      </section>
      <section className="px-6 md:px-20 py-20 text-center">
        <h2 className="text-4xl font-bold text-white mb-12">Who is HOOB For?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            {
              icon: <GraduationCap className="w-12 h-12 text-cyan-400" />,
              title: "Students",
              desc: "Take practical, career-focused courses and earn through micro-gigs while learning.",
            },
            {
              icon: <Briefcase className="w-12 h-12 text-purple-400" />,
              title: "Freelancers",
              desc: "Find verified gigs instantly, showcase work, and get paid reliably via E.A.R.N.",
            },
            {
              icon: <Rocket className="w-12 h-12 text-red-400" />,
              title: "Creators",
              desc: "Repurpose content, monetize subscriptions & collabs, and track performance analytics.",
            },
            {
              icon: <Globe className="w-12 h-12 text-yellow-400" />,
              title: "SMEs",
              desc: "Automate marketing, manage leads, and connect with verified freelancers & creators.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="backdrop-blur-xl bg-white/5 rounded-xl p-8 shadow-lg"
            >
              {f.icon}
              <h3 className="mt-4 text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-gray-300 text-sm">{f.desc}</p>
              <p className="mt-4 text-cyan-400 text-sm italic">
                Join the waitlist to get early access!
              </p>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="px-6 md:px-20 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl p-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Don’t Wait for Growth. Build It.
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Be part of the future of work, learning, and earning. Join thousands
            already signing up for HOOB early access.
          </p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const email = e.target.email.value;
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(email)) {
                setToastMessage("Please enter a valid email address.");
                setToastType("warning");
                setShowToast(true);
                return;
              }
              setLoading(true);
              try {
                const res = await fetch(
                  `${import.meta.env.VITE_API_BASE}/waitlist`,
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email }),
                  }
                );
                let data;
                try {
                  data = await res.json();
                } catch {
                  data = {};
                }
                if (res.ok) {
                  setToastMessage("🎉 You’re on the waitlist!");
                  setToastType("success");
                  setShowToast(true);
                  e.target.reset();
                } else {
                  if (res.status === 400 && data?.message?.toLowerCase().includes("already")) {
                    setToastMessage("You’re already on the waitlist!");
                    setToastType("warning");
                  } else {
                    setToastMessage(
                      data?.message || "Email already registered or invalid."
                    );
                    setToastType("error");
                  }
                  setShowToast(true);
                }
                setLoading(false);
              } catch (err) {
                setToastMessage("Error connecting to server please check your internet connection.");
                setToastType("error");
                setShowToast(true);
                setLoading(false);
              }
            }}
            className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-full bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <button
              type="submit"
              disabled={loading || showToast}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:animate-pulse"
            >
              {loading ? "Adding to waitlist..." : "🚀 Join the Waitlist"}
            </button>
          </form>
        </motion.div>
      </section>
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
    </div>
  );
}