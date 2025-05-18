"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const slideIn = {
    hidden: { x: -100, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  const slideRight = {
    hidden: { x: 100, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        damping: 20,
        stiffness: 100
      }
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

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      
      {/* Hero Section */}
      <motion.div 
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={fadeIn}
        className="relative py-40 overflow-hidden"
      >
        <div className="container mx-auto px-10 relative z-10 ">
          <motion.h1 
            variants={fadeIn}
            className="text-5xl md:text-7xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          >
            About Writers-Flow
          </motion.h1>
          <motion.p 
            variants={fadeIn}
            className="text-xl text-center max-w-3xl mx-auto text-gray-500"
          >
            Discover who we are and what we stand for. We're committed to excellence and innovation in everything we do.
          </motion.p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute inset-0 flex justify-center "
        >
          <div className="w-full h-full bg-[url('/images/pic1.jpg')] bg-repeat opacity-50 "></div>
        </motion.div>
      </motion.div>


      
      {/* Mission & Vision Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          >
            Our Mission & Vision
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              variants={slideIn}
              className="bg-gray-700 p-8 rounded-xl border border-gray-700 shadow-xl backdrop-blur-sm hover:shadow-blue-900/20 hover:shadow-2xl transition-all duration-300"
            >
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-blue-900 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-center text-blue-400">Mission</h3>
              <p className="text-white leading-relaxed text-center">
                A mission statement defines the purpose and primary objectives of an organization.
                It answers the fundamental question: "Why do we exist?" The mission statement focuses on what the organization does, 
                who it serves, and how it delivers value. It reflects the present state of the organization and serves as a guiding principle
                in decision-making and operations. For example, it could emphasize customer service, innovation, or community involvement, 
                ensuring that all stakeholders understand the organization's core goals and objectives.
              </p>
            </motion.div>
            
            <motion.div 
              variants={slideRight}
              className="bg-gray-700 p-8 rounded-xl border border-gray-700 shadow-xl backdrop-blur-sm hover:shadow-purple-900/20 hover:shadow-2xl transition-all duration-300"
            >
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-purple-900 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-center text-purple-400">Vision</h3>
              <p className="text-white leading-relaxed text-center">
                A vision statement outlines the long-term aspirations and future direction of the organization.
                It answers the question: "Where do we want to be?" Unlike the mission statement, which is rooted in the present, 
                the vision statement is forward-looking, inspiring stakeholders with a sense of purpose and ambition.
                It often reflects the ideal state the organization aims to achieve in the future, such as becoming an industry leader, 
                creating a sustainable impact, or transforming lives through innovation.
                A vision statement serves as a motivational tool for employees and a beacon of inspiration for customers and partners.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* About Us Content Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="py-20 bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          >
            Our Story
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left column with timeline */}
            <motion.div 
              variants={slideIn}
              className="lg:col-span-4 space-y-8"
            >
              <div className="relative">
                <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>
                
                {/* Timeline items */}
                {[
                  { year: "2022", title: "The Beginning", desc: "Writers-Flow was born from a vision to connect talented writers with those who need quality content." },
                  { year: "2023", title: "Growing Community", desc: "Our platform expanded, bringing together thousands of writers and taskmasters." },
                  { year: "2024", title: "Innovation", desc: "We introduced revolutionary features to streamline the writing and collaboration process." },
                  { year: "2025", title: "Global Reach", desc: "Today, Writers-Flow connects content creators across the globe with meaningful opportunities." }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: { delay: index * 0.2, duration: 0.5 }
                      }
                    }}
                    className="relative pl-12 pb-10"
                  >
                    <div className="absolute left-0 top-1 h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-300">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Right column with content and images */}
            <motion.div 
              variants={fadeIn}
              className="lg:col-span-8 space-y-10"
            >
              <motion.div 
                variants={fadeIn}
                className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 p-8 rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-sm"
              >
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className="relative w-full md:w-1/3 aspect-square"
                  >
                    <Image
                      src="/images/pic1.jpg"
                      fill
                      className="rounded-xl object-cover shadow-lg"
                      alt="Our Vision"
                    />
                    <div className="absolute -bottom-3 -right-3 w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl -z-10"></div>
                  </motion.div>
                  
                  <div className="w-full md:w-2/3">
                    <h3 className="text-2xl font-bold mb-4 text-blue-400">Our Vision & Values</h3>
                    <p className="text-gray-300 leading-relaxed">
                      The writer and assigner play critical roles in shaping the content of an About page, blending creativity and strategic oversight to create a compelling narrative. The writer is the storyteller, responsible for crafting engaging and authentic content that captures the essence of the organization or individual.
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                variants={fadeIn}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <motion.div 
                  whileHover={{ y: -8 }}
                  className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 p-8 rounded-2xl shadow-xl border border-blue-900/50 backdrop-blur-sm"
                >
                  <div className="mb-4 text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Storytelling Excellence</h3>
                  <p className="text-gray-300">
                    They weave a narrative that highlights the mission, values, history, and vision in a way that resonates with the target audience. By incorporating a clear structure, such as concise sections and headings, and adhering to SEO best practices, the writer ensures that the content is both readable and discoverable online.
                  </p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -8 }}
                  className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 p-8 rounded-2xl shadow-xl border border-purple-900/50 backdrop-blur-sm"
                >
                  <div className="mb-4 text-purple-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">Strategic Coordination</h3>
                  <p className="text-gray-300">
                    On the other hand, the assigner acts as the strategic coordinator, defining the objectives of the About page and providing the writer with guidelines regarding tone, style, and audience expectations. They gather key information from stakeholders, such as founders or team members, and oversee the content creation process to maintain brand consistency.
                  </p>
                </motion.div>
              </motion.div>
              
              <motion.div 
                variants={fadeIn}
                className="relative overflow-hidden rounded-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90 z-10"></div>
                <div className="relative z-20 p-10 text-white">
                  <div className="flex justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <blockquote className="text-xl italic font-medium text-center">
                    "The assigner's role extends to reviewing drafts, offering constructive feedback, and approving the final content. Together, the writer and assigner ensure that the About page is not only informative but also leaves a lasting impression on visitors, balancing creativity with purpose."
                  </blockquote>
                  <div className="mt-6 text-center">
                    <p className="font-bold">Writers-Flow Team</p>
                    <p className="text-sm opacity-80">Creating connections through words</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-10"></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Team Section */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="py-20 "
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          >
            Meet Our Team
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -10 }}
                className="bg-gray-700 p-6 rounded-xl border border-gray-700 shadow-xl backdrop-blur-sm hover:shadow-blue-900/20 hover:shadow-2xl transition-all duration-300 text-center"
              >
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {["JV", "SV", "AK"][index]}
                </div>
                <h3 className="text-xl text-white font-bold mb-2">{["Jeevith", "Sravanthi", "Akiri"][index]}</h3>
                <p className="text-gray-400 mb-4">{["Founder & CEO", "Lead Developer", "Creative Director"][index]}</p>
                <p className="text-gray-300">
                  {[
                    "Passionate about connecting talented writers with opportunities.",
                    "Building innovative solutions for the writing community.",
                    "Ensuring beautiful, functional design across our platform."
                  ][index]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;
