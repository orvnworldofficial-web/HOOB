"use client";

import { motion } from "framer-motion";
import {
  Target,
  Lightbulb,
  Heart,
  Rocket,
  Users,
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

  return (
    <div className="bg-futuristic min-h-screen text-white font-sans">
      {/* Hero Section */}
      <section className="text-center py-24 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600"
        >
          About HOOB
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-200"
        >
          HOOB is the next-gen hub where{" "}
          <span className="text-cyan-400 font-semibold">learning</span>,{" "}
          <span className="text-purple-400 font-semibold">earning</span>, and{" "}
          <span className="text-pink-400 font-semibold">community</span>{" "}
          come together — all powered by ORA and E.A.R.N.
        </motion.p>
      </section>

      {/* Who We Are - Zigzag */}
      <section className="px-6 md:px-20 py-20 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-cyan-400 mb-6">Who We Are</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            HOOB is more than just a platform — it’s a futuristic ecosystem
            designed for creators, learners, and innovators. We merge education,
            work, and growth into one seamless journey. Imagine a place where
            you can learn coding, apply for jobs, manage your wallet, and
            connect with communities — all in the same space.
          </p>
          <p className="mt-4 text-lg text-gray-300 leading-relaxed">
            At the core of HOOB are{" "}
            <span className="text-cyan-400 font-semibold">ORA</span> — your AI
            guide, and{" "}
            <span className="text-purple-400 font-semibold">E.A.R.N</span> — the
            automation engine that powers everything. Together, they make HOOB a
            self-sustaining, ever-evolving digital hub.
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

      {/* Vision & Mission - Zigzag */}
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
            To become the world’s most futuristic hub where education, jobs, and
            communities intersect — empowering millions to learn, grow, and
            thrive in a borderless digital economy.
          </p>
        </motion.div>
      </section>

      <section className="px-6 md:px-20 py-20 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            To merge practical learning, real opportunities, and vibrant
            communities into a gamified, AI-powered experience — accessible to
            everyone, everywhere.
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
        <h2 className="text-4xl font-bold text-center mb-12">Our Core Values</h2>
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

      {/* ORA + EARN Zigzag */}
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
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/signup"
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full font-semibold shadow-lg"
          >
            Join HOOB Today
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}
