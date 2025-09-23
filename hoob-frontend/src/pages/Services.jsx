"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Rocket,
  Users,
  Globe,
  Sparkles,
  MessageCircle,
  Layers,
  Cpu,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
} from "lucide-react";

export default function Services() {
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

      if (res.ok) {
        setToastMessage("🎉 You’re on the waitlist!");
        setToastType("success");
        setShowToast(true);
        setEmail("");
      } else {
        if (res.status === 400 && data?.message?.toLowerCase().includes("already")) {
          setToastMessage("You’re already on the waitlist!");
          setToastType("warning");
        } else {
          setToastMessage(data?.message || "Email already registered or invalid.");
          setToastType("error");
        }
        setShowToast(true);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error submitting waitlist:", err);
      setToastMessage("Error connecting to server.");
      setToastType("error");
      setShowToast(true);
      setLoading(false);
    }
  };

  const serviceGroups = [
    {
      groupTitle: "Learn & Grow",
      services: [
        {
          icon: <GraduationCap className="w-16 h-16 text-purple-400" />,
          title: "Skill Growth & Learning",
          description:
            "HOOB gives you the tools to learn the skills that will define Africa’s future — AI, data, freelancing, branding, and tech entrepreneurship. Not theory, but hands-on, practical growth.",
          points: [
            "Free, practical, and interactive courses",
            "Weekly challenges to sharpen your craft",
            "Gamified learning with streaks, XP, and badges",
            "Certificates to showcase your growth",
          ],
        },
        {
          icon: <Sparkles className="w-16 h-16 text-cyan-400" />,
          title: "Gamified Growth Experience",
          description:
            "Learning shouldn’t feel like homework. HOOB turns growth into a game — streaks, XP, levels, and leaderboards keep you moving forward, one day at a time.",
          points: [
            "Daily streaks to maintain consistency",
            "XP & levels as you complete challenges",
            "Achievement badges for milestones",
            "Leaderboards to push your growth",
          ],
        },
      ],
    },
    {
      groupTitle: "Connect & Collaborate",
      services: [
        {
          icon: <Users className="w-16 h-16 text-blue-400" />,
          title: "Collaboration & Community",
          description:
            "HOOB is the house where Africa’s builders meet. Join communities tied to your courses, work on projects with peers, and never grow alone.",
          points: [
            "Course-based communities with real-time chat",
            "Peer-to-peer project collaborations",
            "Networking with Africa’s creators and innovators",
            "Support system that pushes you to grow",
          ],
        },
        {
          icon: <Globe className="w-16 h-16 text-indigo-400" />,
          title: "African Builders Network",
          description:
            "HOOB isn’t just a platform, it’s a continent-wide network. From Lagos to Nairobi, connect with Africa’s next big creators and innovators.",
          points: [
            "Cross-border collaborations",
            "Opportunities across Africa",
            "Access to events, workshops, and meetups",
            "A seat at Africa’s next big transformation",
          ],
        },
        {
          icon: <Rocket className="w-16 h-16 text-pink-400" />,
          title: "Opportunities to Build",
          description:
            "Growth happens when you take action. HOOB gives you real opportunities to apply your skills on projects, startups, and challenges that matter.",
          points: [
            "Startup challenges and hackathons",
            "Portfolio-ready projects",
            "Guidance on turning projects into businesses",
            "Tools and systems to scale your ideas",
          ],
        },
      ],
    },
    {
      groupTitle: "Support & Guidance",
      services: [
        {
          icon: <Cpu className="w-16 h-16 text-cyan-400" />,
          title: "ORA — Your AI Assistant",
          description:
            "ORA (Oracle Renaissance Assistant) is your personal guide inside HOOB. From nudging you to keep streaks alive, to recommending the next challenge, ORA makes sure you don’t lose momentum.",
          points: [
            "Smart guidance for courses and challenges",
            "Personalized nudges for opportunities",
            "AI-powered mentorship",
            "Helps you navigate the platform",
          ],
        },
        {
          icon: <Layers className="w-16 h-16 text-yellow-400" />,
          title: "E.A.R.N — Wallet & Rewards",
          description:
            "HOOB isn’t just about skills — it’s about rewards. E.A.R.N powers your wallet, XP, and coins, turning effort into tangible progress you can track and unlock.",
          points: [
            "Track XP, coins, and progress",
            "Get rewards for challenges",
            "Integrated wallet for benefits",
            "Monetize skills over time",
          ],
        },
        {
          icon: <MessageCircle className="w-16 h-16 text-red-400" />,
          title: "Always-On Support",
          description:
            "Whether you’re stuck on a challenge or need a push to keep going, HOOB support is always on — from peers, mentors, and AI.",
          points: [
            "24/7 assistance inside communities",
            "Mentors and peers who respond",
            "AI nudges for consistency",
            "Never grow alone",
          ],
        },
      ],
    },
  ];

  return (
    <div className="bg-futuristic min-h-screen text-white py-20 px-6 md:px-20">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          Our{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Services
          </span>
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          At HOOB, we believe growth is a journey: Learn, Collaborate, Build,
          and Earn. Whether you’re a student, freelancer, or entrepreneur, HOOB
          equips you with the tools, people, and opportunities to thrive.
        </p>
      </motion.div>

      {/* WHO IS HOOB FOR? */}
      <section className="px-6 md:px-20 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            Who is HOOB For?
          </h2>
          <p className="mt-4 text-gray-300 max-w-3xl mx-auto">
            HOOB is built to support multiple roles — each with practical tools
            to learn, earn, and grow.
          </p>
        </motion.div>

        <div className="space-y-10">
          {/* Freelancers */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            <div className="md:flex-1 backdrop-blur-xl bg-white/5 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-3">For Freelancers</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Find verified gigs instantly.</li>
                <li>Showcase your work with a HOOB Card.</li>
                <li>Get paid on time with E.A.R.N.</li>
              </ul>
            </div>
            <div className="flex-shrink-0 md:ml-6">
              <Rocket className="w-20 h-20 text-pink-400" />
            </div>
          </motion.div>

          {/* Creators */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            <div className="md:flex-1 backdrop-blur-xl bg-white/5 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-3">For Creators</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>
                  Repurpose content across TikTok, IG, X, LinkedIn in 1 click
                  (ORA Social).
                </li>
                <li>Monetize with subscriptions, products & collabs.</li>
                <li>Analytics to know what works.</li>
              </ul>
            </div>
            <div className="flex-shrink-0 md:ml-6">
              <Sparkles className="w-20 h-20 text-cyan-400" />
            </div>
          </motion.div>

          {/* SMEs */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            <div className="md:flex-1 backdrop-blur-xl bg-white/5 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-3">For SMEs</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Automate customer service & marketing with ORA AI.</li>
                <li>Manage leads and payments in one dashboard.</li>
                <li>Access verified freelancers & creators.</li>
              </ul>
            </div>
            <div className="flex-shrink-0 md:ml-6">
              <Users className="w-20 h-20 text-blue-400" />
            </div>
          </motion.div>

          {/* Students */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col md:flex-row items-center gap-8"
          >
            <div className="md:flex-1 backdrop-blur-xl bg-white/5 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-3">For Students</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Take practical, career-focused courses.</li>
                <li>Earn through micro-gigs while learning.</li>
                <li>Build portfolio → internships → career paths.</li>
              </ul>
            </div>
            <div className="flex-shrink-0 md:ml-6">
              <GraduationCap className="w-20 h-20 text-purple-400" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Groups */}
      {serviceGroups.map((group, i) => (
        <section key={i} className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {group.groupTitle}
          </h2>
          <div className="flex flex-col gap-16">
            {group.services.map((service, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className="flex flex-col md:flex-row items-center gap-8 md:gap-16"
                >
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 p-8 rounded-full bg-white/10 backdrop-blur-md shadow-lg ${
                      isEven ? "" : "order-last"
                    }`}
                  >
                    {service.icon}
                  </div>

                  {/* Text */}
                  <div className="md:flex-1 backdrop-blur-xl bg-white/5 rounded-2xl p-10 shadow-lg border border-white/20">
                    <h3 className="text-3xl font-bold mb-4">{service.title}</h3>
                    <p className="text-gray-300 mb-4">{service.description}</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-2">
                      {service.points.map((point, k) => (
                        <li key={k}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      ))}

      {/* Call to Action with waitlist form */}
      <section className="px-6 md:px-20 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="backdrop-blur-xl bg-white/8 rounded-2xl p-12 text-center shadow-2xl"
        >
          <h2 className="text-4xl font-bold mb-4">
            Don’t wait for growth. Build it.
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Be part of the future of work, learning, and earning. Join thousands
            already signing up for HOOB early access.
          </p>
          <form
            onSubmit={handleWaitlistSubmit}
            className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-xl mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full md:flex-1 px-4 py-3 rounded-full bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              type="submit"
              disabled={loading || showToast}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold shadow-lg w-full md:w-auto disabled:opacity-50 disabled:animate-pulse"
            >
              {loading ? "Adding to waitlist..." : "🚀 Join the Waitlist"}
            </motion.button>
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