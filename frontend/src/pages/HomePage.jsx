import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ImageWithSkeleton from "../components/ImageWithSkeleton";
import Lottie from "lottie-react";
import codingAnimation from "../styles/coding home page.json";
import { ArrowRight, Code, TrendingUp, Calendar, User, Trophy, Zap } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" }); // ✅ Changed to auto
  }, []);

  // ✅ Memoize static data to prevent re-renders
  const faqs = useMemo(() => [
    {
      question: "How can I track my Codeforces and LeetCode progress?",
      answer: "Just enter your handle in the Profile Tracker section...",
    },
    {
      question: "Can I add my own DSA questions?",
      answer: "Yes! Use the Question Tracker to create and organize...",
    },
    {
      question: "What is the DSA Visualizer feature for?",
      answer: "It helps you understand key algorithms using animations...",
    },
    {
      question: "Will my portfolio update automatically?",
      answer: "Once you connect your coding handles, it syncs automatically.",
    },
    {
      question: "What platforms are currently supported?",
      answer: "Codeforces and LeetCode. GFG and AtCoder coming soon!",
    },
    {
      question: "Can I track upcoming contests?",
      answer: "Yes! Use the Event Tracker page to view a contest calendar.",
    },
    {
      question: "Do I need to log in to use these features?",
      answer: "Yes, login is needed to sync handles and save data.",
    },
  ], []);

  const visualizers = useMemo(() => [
    { src: "/dij.png", title: "Dijkstra" },
    { src: "/dfs.png", title: "DFS" },
    { src: "/stack.png", title: "Stack" },
    { src: "/queue.png", title: "Queue" },
    { src: "/binarysearch.png", title: "Binary Search" },
    { src: "/quicksort.png", title: "QuickSort" },
  ], []);

  const features = useMemo(() => [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Progress Tracking",
      description: "Monitor your coding journey across multiple platforms"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "DSA Visualizer",
      description: "Interactive algorithm visualizations for better understanding"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Contest Calendar",
      description: "Never miss important coding contests and competitions"
    },
    // {
    //   icon: <User className="w-6 h-6" />,
    //   title: "Portfolio Builder",
    //   description: "Showcase your coding achievements in one place"
    // }
  ], []);

  // ✅ Optimized animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute "></div>
        <div className="max-w-7xl px-[4%] py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              className="space-y-8"
              {...fadeInUp}
            >
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                  <Trophy className="w-4 h-4 mr-2" />
                  Your Coding Journey Starts Here
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                  Visualize. Track.
                  <br />
                  <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                    & Compare.
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                  <span className="font-semibold text-orange-600">CodbaseX</span> empowers developers 
                  to navigate and accelerate their coding journey with intelligent insights and comprehensive tracking.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/codeforces")}
                  className="group bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-xl transition-colors duration-200 shadow-lg flex items-center justify-center"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                <button
                  onClick={() => navigate("/QuestionTracker")}
                  className="group border-2 border-gray-300 hover:border-orange-500 text-gray-700 hover:text-orange-600 font-semibold py-4 px-8 rounded-xl transition-colors duration-200 flex items-center justify-center"
                >
                  Question Tracker
                  <Code className="w-5 h-5 ml-2" />
                </button>
              </div>

              {/* Feature Pills */}
              <motion.div 
                className="grid grid-cols-2 gap-4 pt-3"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 gpu-accelerated"
                    variants={fadeInUp}
                  >
                    <div className="text-orange-500">{feature.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{feature.title}</h3>
                      <p className="text-gray-600 text-xs">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Animation - ✅ Optimized Lottie */}
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative gpu-accelerated">
                <Lottie
                  animationData={codingAnimation}
                  loop
                  autoplay
                  className="w-[300px] lg:w-[350px] xl:w-[400px]"
                  rendererSettings={{
                    preserveAspectRatio: 'xMidYMid slice',
                    progressiveLoad: true
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - ✅ Simplified animations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "10+", label: "Active Users" },
              { number: "1k+", label: "Problems Tracked" },
              { number: "500+", label: "Contests Monitored" },
              { number: "99%", label: "Uptime" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-orange-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Sections - ✅ Removed complex animations */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* <div className="lg:order-1"> */}
              {/* <ImageWithSkeleton 
                className="w-full h-64 lg:h-80 rounded-2xl shadow-lg object-cover" 
                // src="/photo1.png" 
                alt="Codeforces tracking" 
              /> */}
            {/* </div> */}
            
            <div className="text-center lg:text-left lg:order-2">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Track Your{" "}
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Codeforces
                </span>{" "}
                Journey
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Comprehensive analytics and insights to help you understand your progress and identify areas for improvement.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-gray-700">
                  <Zap className="w-5 h-5 text-orange-500 mr-2" />
                  Real-time updates
                </div>
                <div className="flex items-center text-gray-700">
                  <TrendingUp className="w-5 h-5 text-orange-500 mr-2" />
                  Performance analytics
                </div>
              </div>
            </div>
            
            <div className="lg:order-3">
              <ImageWithSkeleton 
                className="w-full h-64 lg:h-80 rounded-2xl shadow-xl object-cover" 
                src="/1.png" 
                alt="Codeforces demo" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Distribution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ImageWithSkeleton 
                className="w-full h-80 lg:h-96 rounded-2xl shadow-xl object-cover" 
                src="/3.png" 
                alt="Rating distribution" 
              />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Your{" "}
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Rating
                </span>{" "}
                Distribution
              </h2>
              <p className="text-xl text-gray-600">
                Detailed breakdown of your performance across different problem categories and difficulty levels.
              </p>
              <div className="space-y-4">
                {[
                  "Problem difficulty analysis",
                  "Topic-wise performance", 
                  "Contest participation trends",
                  "Improvement recommendations"
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-4"></div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* leaderboard*/}
      <section className="py-20 bg-white">
        <div className="max-w-8xl mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ImageWithSkeleton 
                className="w-full h-100 lg:h-100 rounded-2xl shadow-xl object-cover" 
                src="/leaderboard.png" 
                alt="Rating distribution" 
              />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
                Your{" "}
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  placing in
                </span>{" "}
                Leaderboard
              </h2>
              <p className="text-xl text-gray-600">
                Detailed breakdown of your performance across different problem categories and difficulty levels.
              </p>
              <div className="space-y-4">
                {[
                  "Problem difficulty analysis",
                  "Topic-wise performance", 
                  "Contest participation trends",
                  "Improvement recommendations"
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-4"></div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Contest Tracker Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Simplify Your Contest Preparation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay ahead of the competition with our comprehensive contest tracking and preparation tools.
            </p>
          </div>
          
          <div className="relative group">
            <div className="absolute rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <ImageWithSkeleton
              className="relative w-full h-80 lg:h-96 rounded-2xl shadow-2xl p-5"
              src="/photo4.png"
              alt="Contest tracking interface"
            />
          </div>
        </div>
      </section>

      {/* Portfolio & Card Sections */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          {/* Portfolio */}
          <div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Your{" "}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                All-in-One
              </span>{" "}
              Coding Portfolio
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Showcase your coding achievements, track your progress, and build a professional portfolio that stands out.
            </p>
            <button
              onClick={() => navigate("/portfolio")}
              className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold text-lg group mb-12"
            >
              Get your Portfolio
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="relative group">
              <div className="absolute rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <ImageWithSkeleton
                className="relative w-full h-80 lg:h-96 rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300 p-5"
                src="/portfolio.png"
                alt="Portfolio preview"
              />
            </div>
          </div>

          {/* Card */}
          <div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                UNLOCK
              </span>{" "}
              your Codefolio CARD
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get your personalized coding card to share your achievements with the world.
            </p>
            <button
              onClick={() => navigate("/card")}
              className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold text-lg group mb-12"
            >
              Get your Card
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <ImageWithSkeleton
                  className="relative w-72 h-96 rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                  src="/card.png"
                  alt="Codefolio card"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DSA Visualizers - ✅ Simplified hover effects */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              DSA{" "}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Visualizers
              </span>{" "}
              for Quick Learning
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Interactive algorithm visualizations to help you understand complex concepts with ease.
            </p>
            <button
              onClick={() => navigate("/dsa-visualizer")}
              className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold text-lg group"
            >
              Try Visualizers
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
            {visualizers.map(({ src, title }, i) => (
              <div
                key={i}
                onClick={() => navigate("/dsa-visualizer")}
                className="relative min-w-[280px] bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-200 gpu-accelerated"
              >
                <ImageWithSkeleton 
                  src={src} 
                  alt={title} 
                  className="w-full h-48 object-cover" 
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-600">Interactive visualization</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - ✅ Optimized animations */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about Codfolio
            </p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left p-6 bg-white hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center"
                >
                  <span className="font-semibold text-gray-900 text-lg">{faq.question}</span>
                  <span className="text-orange-500 text-2xl font-light">
                    {openIndex === index ? '−' : '+'}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6 bg-gray-50">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
