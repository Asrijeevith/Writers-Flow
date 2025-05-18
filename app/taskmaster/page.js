"use client";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { Briefcase, Calendar, FileText, MapPin, Send, CheckCircle, Clock, Users } from "lucide-react";

const Taskmaster = () => {
  const [formData, setFormData] = useState({
    work: "",
    deadline: "",
    pages: "",
    address: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to check for a match after submitting a task
  const checkMatch = async (taskId) => {
    try {
      const response = await fetch(`/api/match?id=${taskId}`);
      const data = await response.json();

      if (data.match) {
        toast.success(`Matched with writer: ${data.match.work}`);
      } else {
        toast.error("No writer available for this task");
      }
    } catch (error) {
      toast.error("Failed to check match");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Task submitted successfully!");
        await checkMatch(result.data._id);
        setFormData({ work: "", deadline: "", pages: "", address: "" }); // Reset form
      } else {
        toast.error("Failed to submit task");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 15px -3px rgba(124, 58, 237, 0.3)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 },
    disabled: {
      scale: 1,
      backgroundColor: "#9CA3AF",
      boxShadow: "none"
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

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-purple-900">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero Section */}
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <motion.div 
            className="inline-block mb-6"
            variants={iconVariants}
            whileHover="hover"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center mx-auto">
              <Briefcase size={36} className="text-white" />
            </div>
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
            animate={{ 
              scale: [1, 1.02, 1],
              transition: { duration: 3, repeat: Infinity, repeatType: "reverse" }
            }}
          >
            Taskmaster Dashboard
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Create tasks, find writers, and manage your content projects efficiently.
          </motion.p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          variants={cardVariants}
          whileHover="hover"
        >
          <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
          <div className="p-8">
            <motion.h2 
              className="text-2xl font-bold mb-6 text-gray-800 dark:text-white"
              variants={fadeInUp}
            >
              Create New Task
            </motion.h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants}>
                <div className="flex items-center mb-2">
                  <Briefcase size={18} className="mr-2 text-purple-600 dark:text-purple-400" />
                  <label htmlFor="work" className="text-lg font-medium text-gray-700 dark:text-gray-200">
                    Type of Work
                  </label>
                </div>
                <div className="relative">
                  <select
                    id="work"
                    name="work"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    value={formData.work}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select work type</option>
                    <option value="record writing">Record Writing</option>
                    <option value="assignment writing">Assignment Writing</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <motion.div
                      animate={{ rotate: formData.work ? 0 : 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

             <motion.div variants={itemVariants}>
  <div className="flex items-center mb-2">
    <Calendar size={18} className="mr-2 text-purple-600 dark:text-purple-400" />
    <label htmlFor="deadline" className="text-lg font-medium text-gray-700 dark:text-gray-200">
      Deadline
    </label>
  </div>
  <input
    type="date"
    id="deadline"
    name="deadline"
    className={`w-full px-4 py-3 rounded-lg border ${
      formData.deadline && new Date(formData.deadline) < new Date(new Date().setHours(0, 0, 0, 0))
        ? 'border-red-500'
        : 'border-gray-300 dark:border-gray-600'
    } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200`}
    value={formData.deadline}
    onChange={(e) => {
      const selectedDate = new Date(e.target.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Normalize to start of day
      
      if (selectedDate >= today || e.target.value === '') {
        handleChange(e);
      }
    }}
    min={new Date().toISOString().split('T')[0]} // Sets minimum date to today in calendar
    onBlur={(e) => {
      if (e.target.value && new Date(e.target.value) < new Date(new Date().setHours(0, 0, 0, 0))) {
        // Clear invalid date on blur
        handleChange({ target: { name: 'deadline', value: '' } });
      }
    }}
    required
  />
  {formData.deadline && new Date(formData.deadline) < new Date(new Date().setHours(0, 0, 0, 0)) && (
    <p className="mt-1 text-sm text-red-500">Please select a future date</p>
  )}
</motion.div>

              <motion.div variants={itemVariants}>
                <div className="flex items-center mb-2">
                  <FileText size={18} className="mr-2 text-purple-600 dark:text-purple-400" />
                  <label htmlFor="pages" className="text-lg font-medium text-gray-700 dark:text-gray-200">
                    Number of Pages
                  </label>
                </div>
                <input
                  type="number"
                  id="pages"
                  name="pages"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                  value={formData.pages}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="flex items-center mb-2">
                  <MapPin size={18} className="mr-2 text-purple-600 dark:text-purple-400" />
                  <label htmlFor="address" className="text-lg font-medium text-gray-700 dark:text-gray-200">
                    Your Address
                  </label>
                </div>
                <input
                  id="address"
                  name="address"
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full address"
                />
              </motion.div>

              <motion.div 
                className="pt-4"
                variants={itemVariants}
              >
                <motion.button
                  type="submit"
                  className="w-full py-3 px-6 rounded-lg font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-md flex items-center justify-center"
                  variants={buttonVariants}
                  whileHover={!isSubmitting ? "hover" : "disabled"}
                  whileTap={!isSubmitting ? "tap" : "disabled"}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 9.27455 20.9097 6.80375 19.1414 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Create Task
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          className="mt-16"
          variants={containerVariants}
        >
          <motion.h2 
            className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-white"
            variants={fadeInUp}
          >
            Benefits of Being a Taskmaster
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <motion.div 
                className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4"
                whileHover={{ rotate: 15, scale: 1.1 }}
              >
                <CheckCircle className="text-purple-600 dark:text-purple-400" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Quality Control</h3>
              <p className="text-gray-600 dark:text-gray-300">Ensure high-quality content by selecting from our pool of verified writers.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <motion.div 
                className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4"
                whileHover={{ rotate: 15, scale: 1.1 }}
              >
                <Clock className="text-indigo-600 dark:text-indigo-400" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Time Efficiency</h3>
              <p className="text-gray-600 dark:text-gray-300">Save time with our streamlined process for finding and managing writers.</p>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <motion.div 
                className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4"
                whileHover={{ rotate: 15, scale: 1.1 }}
              >
                <Users className="text-blue-600 dark:text-blue-400" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Writer Matching</h3>
              <p className="text-gray-600 dark:text-gray-300">Our system automatically matches your task with the most suitable writers.</p>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="mt-16 text-center"
          variants={fadeInUp}
        >
          <motion.div 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 shadow-xl"
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(124, 58, 237, 0.25)" }}
          >
            <h3 className="text-2xl font-bold mb-4 text-white">Want to be a writer?</h3>
            <p className="text-white text-lg mb-6">
              Looking for earning money by writing? Join our community of writers and start earning today!
            </p>
            <Link href="/writer">
              <motion.button 
                className="px-6 py-3 bg-white text-purple-600 rounded-lg font-medium shadow-md"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(255, 255, 255, 0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                Become a Writer
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Taskmaster;