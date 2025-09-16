"use client";

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
} from "lucide-react";

export default function Services() {
  const serviceGroups = [
    {
      groupTitle: "Learn & Grow",
      services: [
        {
          icon: <GraduationCap className="w-16 h-16 text-purple-400" />,
          title: "Skill Growth & Learning",
          description:
            "Learn skills that truly matter — from AI, data, freelancing, to branding and tech entrepreneurship. HOOB combines hands-on courses, interactive challenges, and practical resources tailored for Africa.",
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
            "Learning is fun at HOOB. Gamification keeps you motivated and engaged, turning everyday progress into achievements.",
          points: [
            "Daily streaks to maintain consistency",
            "XP & levels as you complete challenges",
            "Achievement badges for key milestones",
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
            "No one grows alone. HOOB is a house where builders meet, partner, and turn ideas into real projects.",
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
            "HOOB is a continent-wide movement. Connect, collaborate, and build with creators across Africa.",
          points: [
            "Cross-border collaborations",
            "Exposure to opportunities across Africa",
            "Access to events, workshops, and meetups",
            "A seat at Africa’s next big transformation",
          ],
        },
        {
          icon: <Rocket className="w-16 h-16 text-pink-400" />,
          title: "Opportunities to Build",
          description:
            "Action drives growth. HOOB members get hands-on opportunities to work on real-world problems and projects.",
          points: [
            "Startup challenges and hackathons",
            "Real projects to add to your portfolio",
            "Guidance on turning projects into businesses",
            "Access to tools and systems to scale your ideas",
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
            "ORA (Oracle Renaissance Assistant) is HOOB’s platform-wide AI guide. From recommending courses to nudging you on opportunities, ORA personalizes your journey and keeps you moving forward.",
          points: [
            "Smart guidance for courses and challenges",
            "Personalized nudges for growth opportunities",
            "Helps navigate the platform efficiently",
            "AI-powered mentorship and progress tracking",
          ],
        },
        {
          icon: <Layers className="w-16 h-16 text-yellow-400" />,
          title: "E.A.R.N — Wallet & Rewards",
          description:
            "E.A.R.N powers your XP, coins, wallet, and other in-platform growth rewards. It makes learning, earning, and tracking your achievements seamless.",
          points: [
            "Track your XP, coins, and progress",
            "Receive rewards for completing challenges",
            "Integrated wallet for platform benefits",
            "Monetize skills and achievements over time",
          ],
        },
        {
          icon: <MessageCircle className="w-16 h-16 text-red-400" />,
          title: "Always-On Support",
          description:
            "Whether you’re stuck, need motivation, or guidance, HOOB has you covered. Between ORA and the human community, you always have support.",
          points: [
            "24/7 assistance inside communities",
            "Mentors and peers who respond",
            "AI nudges that help you stay consistent",
            "A system ensuring you never grow alone",
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
          HOOB offers pathways to learn, grow, collaborate, and earn. Whether
          you’re a student, freelancer, or entrepreneur, you’ll find the tools
          and people to help you thrive.
        </p>
      </motion.div>

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
    </div>
  );
}
