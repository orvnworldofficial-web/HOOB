"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="bg-futuristic min-h-screen text-white font-sans py-24 px-6 md:px-20">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center max-w-4xl mx-auto mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Get in Touch
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300">
          Have questions, ideas, or just want to say hi? HOOB is here to connect. 
          Our community and AI assistant ORA are always ready to guide you. Reach out, and let’s build together.
        </p>
      </motion.div>

      {/* Contact Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid md:grid-cols-3 gap-8 mb-16"
      >
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 flex flex-col items-center text-center hover:scale-105 transform transition duration-300">
          <Mail className="w-10 h-10 text-purple-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Email Us</h3>
          <p className="text-gray-300 text-sm">support@hoob.africa</p>
        </div>

        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 flex flex-col items-center text-center hover:scale-105 transform transition duration-300">
          <Phone className="w-10 h-10 text-cyan-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Call Us</h3>
          <p className="text-gray-300 text-sm">+234 800 123 4567</p>
        </div>

        <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-8 flex flex-col items-center text-center hover:scale-105 transform transition duration-300">
          <MapPin className="w-10 h-10 text-pink-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Visit Us</h3>
          <p className="text-gray-300 text-sm">Lagos, Nigeria - HOOB HQ</p>
        </div>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="backdrop-blur-xl bg-white/10 rounded-3xl p-10 max-w-3xl mx-auto shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-cyan-400">
          Send Us a Message
        </h2>
        <form className="space-y-6">
          <div className="flex flex-col">
            <label className="text-gray-300 mb-2">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none border border-white/20"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-300 mb-2">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none border border-white/20"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-300 mb-2">Message</label>
            <textarea
              rows="6"
              placeholder="Your message..."
              className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none border border-white/20"
            ></textarea>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-full shadow-lg"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
