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
} from "lucide-react";

export default function Home() {
  return (
    <div className="bg-futuristic min-h-screen text-white font-sans">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-28 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
        >
          The Future of Work, Learning & Growth
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-6 max-w-3xl text-lg md:text-xl text-gray-200"
        >
          Welcome to <span className="text-cyan-400 font-semibold">HOOB</span>, 
          the futuristic hub where education, jobs, wallets, and communities 
          converge — all powered by{" "}
          <span className="text-purple-400 font-semibold">E.A.R.N</span> and{" "}
          <span className="text-cyan-400 font-semibold">ORA</span>.
        </motion.p>
        <motion.a
          whileHover={{ scale: 1.05 }}
          href="/signup"
          className="mt-10 inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full font-semibold shadow-lg"
        >
          Get Started <ArrowRight className="ml-2 w-5 h-5" />
        </motion.a>
      </section>

      {/* About HOOB */}
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
            HOOB is more than a platform — it’s a futuristic ecosystem designed 
            to merge <span className="font-semibold">learning, earning, and community</span> 
            into one seamless experience. Whether you’re a student, a job seeker, 
            or an entrepreneur, HOOB equips you with the tools to thrive in the 
            digital-first future.
          </p>
          <p className="mt-4 text-lg text-gray-300 leading-relaxed">
            At its core, HOOB is powered by two engines:{" "}
            <span className="text-cyan-400">ORA</span>, your personal AI guide, 
            and <span className="text-purple-400">E.A.R.N</span>, the autonomous 
            layer that powers our ecosystem.
          </p>
        </motion.div>
      </section>

      {/* ORA Section */}
      <section className="px-6 md:px-20 py-16 grid md:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-xl bg-white/5 rounded-2xl shadow-lg p-10"
        >
          <div className="flex items-center mb-4">
            <Bot className="w-10 h-10 text-cyan-400 mr-3" />
            <h2 className="text-3xl font-bold text-cyan-400">Meet ORA</h2>
          </div>
          <p className="text-lg text-gray-300 leading-relaxed">
            ORA isn’t just an AI assistant. She’s the beating heart of HOOB, 
            guiding users through courses, recommending jobs, keeping streaks 
            alive, and personalizing every step of your journey.
          </p>
          <p className="mt-4 text-lg text-gray-300 leading-relaxed">
            ORA evolves as you grow. The more you interact, the more tailored 
            your experience becomes — turning your learning and career path into 
            a gamified adventure.
          </p>
        </motion.div>

        {/* E.A.R.N Section */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-xl bg-white/5 rounded-2xl shadow-lg p-10"
        >
          <div className="flex items-center mb-4">
            <Sparkles className="w-10 h-10 text-purple-400 mr-3" />
            <h2 className="text-3xl font-bold text-purple-400">Powered by E.A.R.N</h2>
          </div>
          <p className="text-lg text-gray-300 leading-relaxed">
            E.A.R.N is the autonomous layer connecting every feature in HOOB. 
            It ensures your job applications, wallet transactions, course 
            progress, and community engagement are seamlessly integrated.
          </p>
          <p className="mt-4 text-lg text-gray-300 leading-relaxed">
            Imagine an ecosystem that thinks, speaks, and sells itself. That’s 
            the E.A.R.N advantage — automation that multiplies opportunities 
            while reducing friction.
          </p>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-20 py-20 text-center">
        <h2 className="text-4xl font-bold text-white mb-12">Why Choose HOOB?</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              icon: <GraduationCap className="w-10 h-10 text-cyan-400" />,
              title: "Free Gamified Courses",
              desc: "Learn coding, design, and more through practical, interactive lessons tied to XP, badges, and streaks."
            },
            {
              icon: <Briefcase className="w-10 h-10 text-purple-400" />,
              title: "SME Job Board",
              desc: "Connect directly with SMEs posting jobs and internships — a new economy built around skills and merit."
            },
            {
              icon: <Wallet className="w-10 h-10 text-green-400" />,
              title: "HOOB Wallet",
              desc: "Manage balances, track transactions, and earn rewards as you progress in the ecosystem."
            },
            {
              icon: <Users className="w-10 h-10 text-pink-400" />,
              title: "Community Layer",
              desc: "Join course-specific communities, real-time chats, and share stories — engagement tied to XP."
            },
            {
              icon: <Globe className="w-10 h-10 text-yellow-400" />,
              title: "Global Access",
              desc: "HOOB is borderless. Learn, work, and earn no matter where you are."
            },
            {
              icon: <Rocket className="w-10 h-10 text-red-400" />,
              title: "Futuristic Growth",
              desc: "Stay ahead of the curve with AI-powered learning paths and opportunities."
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
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 md:px-20 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl p-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Be Part of the Future
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            HOOB is building the ultimate bridge between{" "}
            <span className="font-semibold">education, opportunity, and growth</span>.  
            Join now and let ORA guide you while E.A.R.N powers your journey.
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            href="/signup"
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full font-semibold shadow-lg"
          >
            Get Started
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}
