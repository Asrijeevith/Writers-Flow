'use client';

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { PenTool, Briefcase, FileText, Edit, Clock, Lock, Users, Award, Target } from "lucide-react";

const Services = () => {
  const { data: session } = useSession();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const roleCardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (customDelay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: customDelay }
  }),
  hover: {
    scale: 1.05,
    boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
    transition: { duration: 0.3 }
  }
};


  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.3
      }
    },
    hover: {
      rotate: 15,
      scale: 1.2,
      transition: { duration: 0.3 }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const services = [
    {
      title: "Content Creation",
      description: "Professional writing services for blogs, articles, and web content.",
      icon: <FileText size={32} />,
      color: "from-blue-500 to-blue-700"
    },
    {
      title: "Editing & Proofreading",
      description: "Meticulous editing to perfect your content and ensure error-free writing.",
      icon: <Edit size={32} />,
      color: "from-purple-500 to-purple-700"
    },
    {
      title: "Quick Turnaround",
      description: "Fast delivery without compromising on quality for time-sensitive projects.",
      icon: <Clock size={32} />,
      color: "from-green-500 to-green-700"
    },
    {
      title: "Collaborative Writing",
      description: "Work with a team of writers to create comprehensive content.",
      icon: <Users size={32} />,
      color: "from-red-500 to-red-700"
    },
    {
      title: "Premium Quality",
      description: "High-quality content that engages readers and meets your objectives.",
      icon: <Award size={32} />,
      color: "from-yellow-500 to-yellow-700"
    },
    {
      title: "Goal-Oriented Content",
      description: "Strategic content creation aligned with your business goals.",
      icon: <Target size={32} />,
      color: "from-indigo-500 to-indigo-700"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >

        {/* Hero Section */}
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            animate={{
              scale: [1, 1.02, 1],
              transition: { duration: 3, repeat: Infinity, repeatType: "reverse" }
            }}
          >
            Our Services
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Elevate your writing experience with our comprehensive suite of services designed for both writers and taskmasters.
          </motion.p>
        </motion.div>
        <div className="border-b-2 border-gray-300 dark:border-gray-600 mb-11" />

        {/* Role Selection */}
        <motion.div
        className="w-full mb-10 "
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-3xl font-bold text-center mb-20  text-gray-800 dark:text-white"
            variants={fadeInUp}
          >
            Choose Your Role
          </motion.h2>

          {session ? (
            <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16">
              {/* Writer */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg p-8 text-center flex flex-col items-center"
                variants={roleCardVariants}
                custom={0}
                whileHover="hover"
                initial="hidden"
                whileInView="visible"
viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center mb-6"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <PenTool size={32} className="text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Writer</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Create content, collaborate with taskmasters, and showcase your writing skills.
                </p>
                <Link href="/writer">
                  <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-medium shadow-md w-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started as Writer
                  </motion.button>
                </Link>
              </motion.div>

              {/* Taskmaster */}
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg p-8 text-center flex flex-col items-center"
                variants={roleCardVariants}
                custom={0.2}
                whileHover="hover"
                initial="hidden"
                whileInView="visible"
viewport={{ once: true, amount: 0.3 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center mb-6"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <Briefcase size={32} className="text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Taskmaster</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Manage projects, assign tasks to writers, and oversee content creation.
                </p>
                <Link href="/taskmaster">
                  <motion.button
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg font-medium shadow-md w-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started as Taskmaster
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          ) : (
            // Locked view with translucent glass effect
              <div className="min-h-screen relative bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center p-10">
      {/* Background pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/asfalt-light.png')`,
          opacity: 0.2,
          zIndex: 0,

        }}
      />

      {/* Glass card */}
      <motion.div
        className="relative max-w-md w-full rounded-3xl overflow-hidden p-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-white/30 dark:bg-gray-900/30 backdrop-blur-xl border border-white/40 dark:border-gray-700 rounded-3xl pointer-events-none z-10" />

        {/* Content */}
        <div className="relative z-20 text-center text-gray-900 dark:text-white">
          <Lock size={48} className="mx-auto mb-4 opacity-80" />
          <h3 className="text-2xl font-semibold mb-2">Login Required</h3>
          <p className="mb-6 text-gray-800 dark:text-gray-300">
            Please log in to unlock roles and explore our services.
          </p>
          <button
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg font-medium text-white shadow-md hover:scale-105 transition-transform"
          >
            Login to Continue
          </button>
        </div>
      </motion.div>
    </div>

  


          )}
        </motion.div>

        {/* Services Grid */}
        <motion.div
  className="px-4"
>
  <motion.h2
    className="text-3xl font-bold text-center mb-14 my-24 text-gray-800 dark:text-white"
    variants={fadeInUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    What We Offer
  </motion.h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {services.map((service, index) => (
      <motion.div
        key={index}
        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md p-8 flex flex-col items-center text-center cursor-pointer"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        whileHover="hover"
        transition={{ delay: index * 0.1 }}
      >
        <motion.div
          className={`w-20 h-20 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center mb-6`}
          variants={iconVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          whileHover="hover"
        >
          {service.icon}
        </motion.div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
          {service.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {service.description}
        </p>
      </motion.div>
    ))}
  </div>
</motion.div>


         {!session && (
          <motion.div className="mt-20 text-center" variants={fadeInUp}>
            <motion.div
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-10 shadow-xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-white">Ready to Get Started?</h2>
              <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
                Join our platform today and experience the seamless collaboration between writers
                and taskmasters.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/signup">
                  <motion.button
                    className="px-8 py-3 bg-white text-blue-600 rounded-lg font-medium shadow-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign Up Now
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    className="px-8 py-3 border border-white text-white rounded-lg font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Contact Us
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Services;
