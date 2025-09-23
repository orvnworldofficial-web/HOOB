"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, CheckCircle, AlertCircle, AlertTriangle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !message) {
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
      const response = await fetch(`${import.meta.env.VITE_API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (response.ok) {
        setToastMessage("🎉 Message sent successfully!");
        setToastType("success");
        setShowToast(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        if (response.status === 400 && data?.message?.toLowerCase().includes("already")) {
          setToastMessage("You’ve already sent a message with this email!");
          setToastType("warning");
        } else {
          setToastMessage(data?.message || "Something went wrong. Try again.");
          setToastType("error");
        }
        setShowToast(true);
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setToastMessage("Error connecting to server.");
      setToastType("error");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-futuristic from-gray-900 to-black text-white py-20">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact Us
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-gray-300">
              Have questions or want to collaborate? Get in touch with us below.
            </p>
            <div className="flex items-center space-x-4">
              <Mail className="text-blue-400" />
              <span>orvnworldofficial@gmail.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="text-green-400" />
              <span>+234 000 000 0000</span>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="text-red-400" />
              <span>Lagos, Nigeria</span>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-neon border border-white/20 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <label className="block mb-2 text-gray-300 font-sans">Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/10 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-300 font-sans">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/10 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
            <div>
              <label className="block mb-2 text-gray-300 font-sans">Message</label>
              <textarea
                name="message"
                rows="5"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/10 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              ></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              type="submit"
              disabled={loading || showToast}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-lg disabled:opacity-50 disabled:animate-pulse"
            >
              {loading ? "Sending..." : "Send Message"}
            </motion.button>
          </motion.form>
        </div>
      </div>

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
    </section>
  );
}
