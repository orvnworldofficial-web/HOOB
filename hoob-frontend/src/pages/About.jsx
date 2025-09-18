"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Target,
  Lightbulb,
  Heart,
  Rocket,
  Brain,
  Workflow,
  Globe,
  Sparkles,
} from "lucide-react";

export default function About() {
  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  // Waitlist form state
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus("loading");

  try {
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/waitlist`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email }),
});

    if (res.ok) {
      setStatus("success");
      setEmail("");
    } else {
      // Try to grab backend error message if available
      try {
        const data = await res.json();
        setStatus(data?.message || "error");
      } catch {
        setStatus("error");
      }
    }
  } catch (err) {
    console.error("Error submitting waitlist:", err);
    setStatus("error");
  }
};


  return (
    <div className="bg-futuristic min-h-screen text-white font-sans">
      {/* Hero / Why HOOB */}
      <section className="text-center py-24 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600"
        >
          Why HOOB?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-200 leading-relaxed"
        >
          HOOB is built on one belief:{" "}
          <span className="italic text-cyan-400 font-semibold">
            Growth should be simple, accessible, and rewarding.
          </span>
        </motion.p>
      </section>

      {/* The Gaps Section */}
<section className="px-6 md:px-20 py-20">
  {/* Header */}
  <motion.div
    initial={{ opacity: 0, y: -30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="text-center mb-16"
  >
    <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
      The Gaps We’re Here to Fix
    </h2>
    <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
      Before HOOB, these challenges held back creators, freelancers, SMEs, and students. 
      We’ve seen them firsthand—and we’re building to close these gaps.
    </p>
  </motion.div>

  {/* Struggles List */}
  <div className="space-y-16">
    {[
      {
        title: "SMEs stuck in endless DMs",
        text: "Small businesses waste countless hours replying to scattered DMs, chasing confirmations, and juggling customers across different apps. Instead of scaling, they get stuck in busywork.",
        icon: <Workflow className="w-16 h-16 text-purple-400" />,
      },
      {
        title: "Creators without stability",
        text: "Creators grind on multiple platforms, posting daily, chasing trends—yet most still lack consistent income. Their creativity fuels the internet, but the system doesn’t reward them fairly.",
        icon: <Rocket className="w-16 h-16 text-pink-400" />,
      },
      {
        title: "Freelancers chasing payments",
        text: "Freelancers often wait weeks—or even months—for payment after finishing jobs. Late invoices and unreliable platforms create a cycle of uncertainty that kills momentum.",
        icon: <Target className="w-16 h-16 text-cyan-400" />,
      },
      {
        title: "Students left without opportunities",
        text: "Millions of students complete online courses, but with no real projects, networks, or pathways to jobs. Learning feels like a dead end, instead of a launchpad to growth.",
        icon: <Lightbulb className="w-16 h-16 text-yellow-400" />,
      },
    ].map((item, i) => (
      <motion.div
        key={i}
        variants={i % 2 === 0 ? fadeInLeft : fadeInRight}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.8 }}
        className={`flex flex-col md:flex-row ${
          i % 2 !== 0 ? "md:flex-row-reverse" : ""
        } items-center gap-10`}
      >
        <div className="flex-shrink-0">{item.icon}</div>
        <div className="backdrop-blur-lg bg-white/5 p-8 rounded-2xl shadow-lg max-w-2xl">
          <h3 className="text-xl font-semibold text-white mb-3">
            {item.title}
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed">{item.text}</p>
        </div>
      </motion.div>
    ))}
  </div>
</section>


      {/* Who We Are */}
      <section className="px-6 md:px-20 py-20 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-cyan-400 mb-6">
            Who We Are
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            HOOB was built to fix this system. We’re not building{" "}
            <span className="font-semibold text-purple-400">
              just another app
            </span>
            . We’re building the infrastructure that lets you thrive.
          </p>
          <p className="mt-4 text-lg text-gray-300 leading-relaxed">
            Just like banks are not about apps but about{" "}
            <span className="font-semibold text-cyan-400">systems</span> — HOOB
            is about the systems that keep your business, brand, and career
            moving. <br />
            <span className="text-pink-400 font-bold">HOOB is your Growth Buddy.</span>
          </p>
        </motion.div>
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <Globe className="w-40 h-40 text-cyan-400 opacity-80" />
        </motion.div>
      </section>

      {/* Vision */}
      <section className="px-6 md:px-20 py-20 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
          className="flex justify-center order-2 md:order-1"
        >
          <Target className="w-40 h-40 text-cyan-400 opacity-80" />
        </motion.div>
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
          className="order-1 md:order-2"
        >
          <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            To be the go-to platform where freelancers, creators, brands, and
            students grow, connect, and succeed.
          </p>
        </motion.div>
      </section>

      {/* Mission */}
      <section className="px-6 md:px-20 py-20 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Empowering talent and businesses with tools to learn, collaborate,
            and earn in the digital economy.
          </p>
        </motion.div>
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <Lightbulb className="w-40 h-40 text-yellow-400 opacity-80" />
        </motion.div>
      </section>

      {/* Core Values */}
      <section className="px-6 md:px-20 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <Heart className="w-10 h-10 text-pink-400" />,
              title: "Community",
              desc: "We believe in building together. HOOB thrives on connections, collaboration, and shared growth.",
            },
            {
              icon: <Brain className="w-10 h-10 text-cyan-400" />,
              title: "Innovation",
              desc: "Constantly evolving with AI and futuristic design, we push boundaries to stay ahead of the curve.",
            },
            {
              icon: <Workflow className="w-10 h-10 text-purple-400" />,
              title: "Simplicity",
              desc: "Complex systems, simplified. We design experiences that are intuitive and frictionless.",
            },
          ].map((value, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="backdrop-blur-xl bg-white/5 rounded-xl p-8 shadow-lg text-center"
            >
              {value.icon}
              <h3 className="mt-4 text-xl font-semibold">{value.title}</h3>
              <p className="mt-2 text-gray-300 text-sm">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ORA */}
      <section className="px-6 md:px-20 py-20 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-cyan-400 mb-4">ORA</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            ORA is your personal AI guide within HOOB. From recommending courses
            to nudging you about opportunities, ORA personalizes your journey.
            Think of her as your futuristic study buddy, mentor, and assistant —
            all in one.
          </p>
        </motion.div>
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <Sparkles className="w-40 h-40 text-cyan-400 opacity-80" />
        </motion.div>
      </section>

      {/* E.A.R.N */}
      <section className="px-6 md:px-20 py-20 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
          className="flex justify-center order-2 md:order-1"
        >
          <Rocket className="w-40 h-40 text-purple-400 opacity-80" />
        </motion.div>
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
          className="order-1 md:order-2"
        >
          <h2 className="text-3xl font-bold text-purple-400 mb-4">E.A.R.N</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            E.A.R.N is the autonomous engine of HOOB — seamlessly integrating
            jobs, wallets, courses, and communities. It’s the invisible layer
            ensuring that everything just works, while multiplying your growth
            opportunities.
          </p>
        </motion.div>
      </section>

      {/* Closing CTA */}
      <section className="px-6 md:px-20 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl p-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Building the Future Together
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            HOOB is more than a project — it’s a movement. Join us as we build
            the most advanced hub for learning, work, and growth.
          </p>

          {/* Waitlist Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-full bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full font-semibold shadow-lg disabled:opacity-50"
            >
              {status === "loading" ? "Joining..." : "Join Waitlist"}
            </motion.button>
          </form>

          {status === "success" && (
            <p className="text-green-400 mt-4">🎉 You’re on the list!</p>
          )}
          {status === "error" && (
            <p className="text-red-400 mt-4">Something went wrong. Try again.</p>
          )}
          {status === "idle" && (
            <p className="text-sm text-gray-400 mt-4">
              Be the first to experience HOOB. No spam, just future updates.
            </p>
          )}
        </motion.div>
      </section>
    </div>
  );
}
