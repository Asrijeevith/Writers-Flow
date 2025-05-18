"use client"; // ✅ Required for Next.js client components

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const slideIn = {
    hidden: { x: -50, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        damping: 25,
        stiffness: 100
      }
    }
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setResponseMessage("✅ Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } else {
        setResponseMessage(`❌ Error: ${data.error || "Failed to send message"}`);
      }
    } catch (error) {
      setResponseMessage("❌ Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      
      <motion.div 
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={staggerContainer}
        className="container mx-auto px-4 py-16"
      >
        {/* Hero Section */}
        <motion.section
          className="text-center mb-16 my-10"
          variants={fadeIn}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            We'd love to hear from you! Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions.
          </motion.p>
        </motion.section>
        
        {/* Contact Form and Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div 
            variants={fadeIn}
            className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-8 rounded-2xl shadow-2xl border border-gray-700"
          >
            <motion.h2 
              variants={fadeIn}
              className="text-2xl font-bold mb-6 text-white"
            >
              Send Us a Message
            </motion.h2>

            <motion.form 
              variants={staggerContainer}
              className="space-y-6" 
              onSubmit={handleSubmit}
            >
              <motion.div variants={slideIn}>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                  placeholder="Your name"
                />
              </motion.div>

              <motion.div variants={slideIn}>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                  placeholder="your.email@example.com"
                />
              </motion.div>

              <motion.div variants={slideIn}>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea
                  name="message"
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                  placeholder="Your message here..."
                ></textarea>
              </motion.div>

              <motion.div 
                variants={fadeIn}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 font-medium"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : "Send Message"}
                </button>
              </motion.div>

              {responseMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center p-3 rounded-lg ${
                    responseMessage.includes("✅") 
                      ? "bg-green-900/30 text-green-400 border border-green-800" 
                      : "bg-red-900/30 text-red-400 border border-red-800"
                  }`}
                >
                  {responseMessage}
                </motion.div>
              )}
            </motion.form>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div 
            variants={fadeIn}
            className="space-y-10"
          >
            <motion.div 
              variants={fadeIn}
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-8 rounded-2xl shadow-2xl border border-gray-700"
            >
              <h2 className="text-2xl font-bold mb-6 text-white">Contact Information</h2>
              
              <div className="space-y-6">
                <motion.div 
                  variants={slideIn}
                  className="flex items-start space-x-4"
                >
                  <div className="bg-blue-600/20 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Email</h3>
                    <p className="text-blue-400 mt-1">jeevith5432@gmail.com</p>
                    <p className="text-gray-400 text-sm mt-1">We'll respond within 24 hours</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  variants={slideIn}
                  className="flex items-start space-x-4"
                >
                  <div className="bg-purple-600/20 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Phone</h3>
                    <p className="text-purple-400 mt-1">+91 8317614534</p>
                    <p className="text-gray-400 text-sm mt-1">Monday to Friday, 9AM-6PM</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  variants={slideIn}
                  className="flex items-start space-x-4"
                >
                  <div className="bg-green-600/20 p-3 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Address</h3>
                    <p className="text-green-400 mt-1">GMR, Rajam</p>
                    <p className="text-gray-400 text-sm mt-1">Come visit our office</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-8 rounded-2xl shadow-2xl border border-gray-700"
            >
              <h2 className="text-2xl font-bold mb-6 text-white">Connect With Us</h2>
              <div className="flex space-x-4">
               <motion.a 
  href="https://x.com/d_lufi85692" 
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  className="bg-blue-600/20 p-3 rounded-lg text-white hover:bg-blue-600/30 transition-colors"
>
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
  </svg>
</motion.a>

<motion.a 
  href="https://github.com/Asrijeevith" 
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  className="bg-purple-600/20 p-3 rounded-lg text-white hover:bg-purple-600/30 transition-colors"
>
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
</motion.a>

<motion.a 
  href="https://www.instagram.com/sri.jeevith._/?next=%2F" 
  target="_blank"
  rel="noopener noreferrer"
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  className="bg-pink-600/20 p-3 rounded-lg text-white hover:bg-pink-600/30 transition-colors"
>
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
  </svg>
</motion.a>

              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
