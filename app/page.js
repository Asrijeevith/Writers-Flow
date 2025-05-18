"use client";

import { useState, useEffect } from "react";
import Card from "./components/Card";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const slideIn = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  const services = [
    {
      title: "For TaskMasters",
      description:
        "Easily post writing tasks, specify requirements, and get matched with talented writers.",
      icon: "✍️",
    },
    {
      title: "For Writers",
      description:
        "Browse assignments tailored to your expertise, accept orders, and deliver exceptional work.",
      icon: "📝",
    },
    {
      title: "Effortless Collaboration",
      description:
        "Communicate directly, track progress, and manage deadlines with our intuitive platform.",
      icon: "🤝",
    },
    {
      title: "Local Matching",
      description:
        "Connect with writers in your area to foster stronger connections and faster delivery.",
      icon: "🌎",
    },
    {
      title: "Secure Payments",
      description:
        "Our escrow system ensures fair transactions and protects both parties.",
      icon: "💰",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <motion.div
  initial="hidden"
  animate={isLoaded ? "visible" : "hidden"}
  variants={fadeIn}
  className="container mx-auto px-4 py-16 md:py-24"
>
  <div className="flex flex-col md:flex-row items-center gap-12">
    {/* Left side content */}
    <motion.div variants={fadeIn} className="w-full md:w-1/2 space-y-6">
      {!session ? (
        <>
          <motion.h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Writers-Flow
            </span>
          </motion.h1>

          <motion.p variants={fadeIn} className="text-xl text-gray-600 dark:text-gray-300">
            Connecting Writers and Work Assigners Seamlessly
          </motion.p>

          <motion.p variants={fadeIn} className="text-gray-500 dark:text-gray-400">
            Your ultimate platform to bridge the gap between writers and Taskmasters.
            Whether you're seeking meaningful projects or quality content, we've
            streamlined the process for clarity, efficiency, and satisfaction.
          </motion.p>

          <motion.div variants={fadeIn} className="flex gap-4 pt-4">
            <Link href="/about">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium shadow-lg hover:bg-blue-700 transition-colors"
              >
                Learn More
              </motion.button>
            </Link>

            <Link href="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-medium shadow-lg hover:bg-gray-50 transition-colors"
              >
                Get Started
              </motion.button>
            </Link>
          </motion.div>
        </>
      ) : (
        <>
          <motion.h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Welcome back,{" "}
            <span className="text-blue-600">{session.user?.name || "User"}</span>!
          </motion.h1>

          <motion.p variants={fadeIn} className="text-xl text-gray-600 dark:text-gray-300">
            We're glad to have you on Writers-Flow again 🎉
          </motion.p>
        </>
      )}
    </motion.div>

    {/* Right side image (same for both states) */}
    <motion.div variants={slideIn} className="w-full md:w-1/2 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative z-10"
      >
        <Image
          src="/images/pic1.jpg"
          width={700}
          height={700}
          className="rounded-2xl shadow-2xl"
          alt="Writer Image"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute -bottom-6 -right-6 w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl -z-10"
      />
    </motion.div>
  </div>
</motion.div>



      {/* Services Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="py-20 bg-gray-200 dark:bg-gray-800"
      >
        <div className="container mx-auto px-4">
          <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-bold text-center mb-16">
            Our Services
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-500 dark:text-gray-300">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section (Only show if not logged in) */}
      {status !== "loading" && !session && (
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
          className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Writing Experience?
            </motion.h2>

            <motion.p variants={fadeIn} className="text-xl mb-10 max-w-3xl mx-auto">
              Join Writers-Flow today and experience the future of streamlined writing collaboration!
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-blue-600 rounded-lg font-medium shadow-lg hover:bg-gray-100 transition-colors"
                >
                  Sign Up Now
                </motion.button>
              </Link>

              <Link href="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-medium shadow-lg hover:bg-white/10 transition-colors"
                >
                  Log In
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Footer Section */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Writers-Flow</h3>
              <p className="text-gray-400">Connecting writers and taskmasters seamlessly since 2025.</p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/services" className="text-gray-400 hover:text-white">Services</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/terms" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="https://x.com/d_lufi85692" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://github.com/Asrijeevith" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
