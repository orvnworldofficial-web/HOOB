
import { useState } from "react";
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
} from "lucide-react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [waitlistCount, setWaitlistCount] = useState(1245); // placeholder, dynamic later
  const [showModal, setShowModal] = useState(false);

 const handleWaitlistSubmit = async (e) => {
  e.preventDefault();
  if (!email) return;

  try {
    // Save email & subscribe via backend (MongoDB + Mailchimp)
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/waitlist`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email }),
});


    if (!res.ok) throw new Error("Failed to join waitlist");

    // Update UI
    setWaitlistCount((prev) => prev + 1);
    setEmail("");
    setShowModal(true);
  } catch (err) {
    console.error("Error submitting waitlist:", err);
  }
};


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

        {/* Waitlist Form */}
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
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full font-semibold shadow-lg hover:scale-105 transform transition"
            title="Be the first to experience HOOB at launch"
          >
            🚀 Join Waitlist
          </button>
        </motion.form>

        {/* Waitlist Counter */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-4 text-cyan-400 font-semibold"
        >
          🎉 Already {waitlistCount.toLocaleString()} people joined the waitlist!
        </motion.p>
      </section>

      {/* About Section */}
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
            💡 Explore the Ecosystem{" "}
            <ArrowRight className="ml-2 w-5 h-5" />
          </motion.a>
        </motion.div>
      </section>

      {/* ORA + E.A.R.N Section */}
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

      {/* Who HOOB is For */}
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

      {/* Call to Action */}
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

    {/* Waitlist Form */}
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const email = e.target.email.value;

        try {
          const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/waitlist`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email }),
});

          if (res.ok) {
            alert("🎉 You’re on the waitlist!");
            e.target.reset();
          } else {
            alert("⚠️ Something went wrong. Try again.");
          }
        } catch (err) {
          alert("⚠️ Error connecting to server.");
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
        className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-transform"
      >
        🚀 Join the Waitlist
      </button>
    </form>
  </motion.div>
</section>


      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10 max-w-md text-center text-white"
          >
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Success!</h3>
            <p className="text-gray-200 mb-4">
              You’ve joined the HOOB waitlist. Check your email for confirmation
              and updates.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="mt-2 px-6 py-2 bg-cyan-500 rounded-full font-semibold hover:bg-cyan-400 transition"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
