import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring,useInView } from "framer-motion";
import ImageWithSkeleton from "../components/ImageWithSkeleton";
import Lottie from "lottie-react";
import codingAnimation from "../styles/coding home page.json";
import { ArrowRight, Code, TrendingUp, Calendar, User, Trophy, Users, CheckCircle, Zap, Star } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();

  // increasing number valuesa effect
  const StatCard = ({ icon: Icon, value, label }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      let duration=0;
       if(end>=1000){duration=300000;}
       else if(end>=100){duration=30000;}
       else{duration=1800;}
      const stepTime = Math.max(Math.floor(duration / end), 20);

      const timer = setInterval(() => {
        if(end>=1000){start += 150;}
        else if(end>=100){start += 11;}
        else{start += 1;}
        setCount(start);
        if (start >= end) clearInterval(timer);
      }, stepTime);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center"
      whileHover={{ scale: 1.05 }}
    >
      <Icon className="text-orange-500 w-10 h-10 mb-2" />
      <h3 className="text-3xl font-bold text-gray-800">{count}</h3>
      <p className="text-gray-600">{label}</p>
    </motion.div>
  );
};

  useEffect(() => {
    // Simulate loading (replace with actual asset loading logic if needed)
    const timer = setTimeout(() => setIsLoading(false), 1500);
    window.scrollTo({ top: 0, behavior: "auto" });
    return () => clearTimeout(timer);
  }, []);

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
      answer: "Once you connect your coding handles, it syncsautomatically.",
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
      description: "Monitor your coding ARTcoding journey across multiple platforms"
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
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Leaderboard",
      description: "Monitor your coding journey across multiple platforms"
    },
  ], []);

  // Enhanced animation variants for fade-in and slide-up
  const fadeInUp = {
    initial: { opacity: 0, y: 80 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        StuartstaggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.4, 0, 0.2, 1],
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  // // Preloader component
  // const Preloader = () => (
  //   <motion.div
  //     className="fixed inset-0 flex items-center justify-center bg-white z-50"
  //     initial={{ opacity: 1 }}
  //     animate={{ opacity: 0 }}
  //     transition={{ duration: 0.5, delay: 1 }}
  //     onAnimationComplete={() => setIsLoading(false)}
  //   >
  //     <motion.div
  //       className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full"
  //       animate={{ rotate: 360 }}
  //       transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  //     />
  //   </motion.div>
  // );

  // if (isLoading) return <Preloader />;

  return (
    <div className="min-h-screen relative">
      {/* Progress bar */}
      {/* <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-orange-500 z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      /> */}

      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="absolute"></div>
        <div className="max-w-7xl px-[4%] py-16 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <motion.div className="space-y-8" variants={staggerContainer}>
              <motion.div
                className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium"
                variants={fadeInUp}
              >
                <Trophy className="w-4 h-4 mr-2" />
                Your Coding Journey Starts Here
              </motion.div>
              
              <motion.h1
                className="text-5xl lg:text-6xl font-bold leading-tight text-gray-900"
                variants={fadeInUp}
              >
                Visualize. Track.
                <br />
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  & Compare.
                </span>
              </motion.h1>
              
              <motion.p
                className="text-xl text-gray-600 leading-relaxed max-w-xl"
                variants={fadeInUp}
              >
                <span className="font-semibold text-orange-600">CodbaseX</span> empowers developers 
                to navigate and accelerate their coding journey with intelligent insights and comprehensive tracking.
              </motion.p>

              <motion.div className="flex flex-col sm:flex-row gap-4" variants={fadeInUp}>
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
              </motion.div>
            </motion.div>

            <motion.div
              className="flex justify-center lg:justify-end"
              variants={fadeInUp}
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
      </motion.section>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-3 px-[4%]"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 gpu-accelerated"
            variants={fadeInUp}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <div className="text-orange-500">{feature.icon}</div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">{feature.title}</h3>
              <p className="text-gray-600 text-xs">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats Section */}
      <motion.section
        className="py-16 bg-white"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
          >
           <StatCard icon={Users} value={15} label="Active Users" />
        <StatCard icon={CheckCircle} value={7621} label="Problems Tracked" />
        <StatCard icon={Zap} value={576} label="Contests Monitored" />
        <StatCard icon={Star} value={4.9} label="Rating" />
          </motion.div>
        </div>
      </motion.section>
      

      {/* Image Sections */}
      <motion.section
        className="py-20 bg-gradient-to-r from-gray-50 to-orange-50"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto px-6 ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ">
            <motion.div className="text-center lg:text-left lg:order-2 " variants={fadeInUp}>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 ">
                Track Your{" "}
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Codeforces
                </span>{" "}
                Journey
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Comprehensive analytics and insights to help you understand your progress and identify areas for improvement.
              </p>
              <motion.div className="flex flex-wrap gap-4" variants={staggerContainer}>
                <motion.div className="flex items-center text-gray-700" variants={fadeInUp}>
                  <Zap className="w-5 h-5 text-orange-500 mr-2" />
                  Real-time updates
                </motion.div>
                <motion.div className="flex items-center text-gray-700" variants={fadeInUp}>
                  <TrendingUp className="w-5 h-5 text-orange-500 mr-2" />
                  Performance analytics
                </motion.div>
              </motion.div>
            </motion.div>
            
           <motion.div className="lg:order-3 rounded-3xl overflow-hidden" variants={fadeInUp}>
  <ImageWithSkeleton 
    className="w-full h-64 lg:h-80 object-cover" 
    src="/1.png" 
    alt="Codeforces demo" 
  />
</motion.div>

          </div>
        </div>
      </motion.section>

      {/* Problem Distribution Section */}
      <motion.section
        className="py-20 bg-white"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ">
            <motion.div variants={fadeInUp}>
              <ImageWithSkeleton 
                className="w-full h-80 lg:h-96 rounded-2xl shadow-xl object-cover" 
                src="/3.png" 
                alt="Rating distribution" 
              />
            </motion.div>
            
            <motion.div className="space-y-6" variants={fadeInUp}>
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
              <motion.div className="space-y-4" variants={staggerContainer}>
                {[
                  "Problem difficulty analysis",
                  "Topic-wise performance", 
                  "Contest participation trends",
                  "Improvement recommendations"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center"
                    variants={fadeInUp}
                  >
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-4"></div>
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Leaderboard Section */}
      <motion.section
        className="py-20 bg-white"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-8xl mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeInUp}>
              <ImageWithSkeleton 
                className="w-full rounded-2xl shadow-xl object-cover" 
                src="/leaderboard.png" 
                alt="Rating distribution" 
              />
            </motion.div>
            
            <motion.div className="space-y-6" variants={fadeInUp}>
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
              <motion.div className="space-y-4" variants={staggerContainer}>
                {[
                  "Problem difficulty analysis",
                  "Topic-wise performance", 
                  "Contest participation trends",
                  "Improvement recommendations"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center"
                    variants={fadeInUp}
                  >
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-4"></div>
                    <span className="text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contest Tracker Section */}
      <motion.section
        className="py-20"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Simplify Your Contest Preparation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay ahead of the competition with our comprehensive contest tracking and preparation tools.
            </p>
          </motion.div>
          
          <motion.div className="relative group" variants={fadeInUp}>
            <div className="absolute rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <ImageWithSkeleton
              className="relative w-full rounded-2xl p-5"
              src="/photo4.png"
              alt="Contest tracking interface"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Portfolio & Card Sections */}
      <motion.section
        className="py-20 bg-white"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          <motion.div className="text-center" variants={fadeInUp}>
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
            <motion.button
              onClick={() => navigate("/portfolio")}
              className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold text-lg group mb-12"
              variants={fadeInUp}
            >
              Get your Portfolio
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.div className="relative group" variants={fadeInUp}>
              <div className="absolute rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <ImageWithSkeleton
                className="relative w-full h-[15%] lg:h-96 rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300 p-[1%]"
                src="/portfolio.png"
                alt="Portfolio preview"
              />
            </motion.div>
          </motion.div>

          <motion.div className="text-center" variants={fadeInUp}>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                UNLOCK
              </span>{" "}
              your Base
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                X
              </span>{" "}
              CARD
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get your personalized coding card to share your achievements with the world.
            </p>
            <motion.button
              onClick={() => navigate("/card")}
              className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold text-lg group mb-12"
              variants={fadeInUp}
            >
              Get your Card
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.div className="flex justify-center" variants={fadeInUp}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <ImageWithSkeleton
                  className="relative w-72 h-96 rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                  src="/card.png"
                  alt="Codefolio card"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* DSA Visualizers */}
      <motion.section
        className="py-20 bg-gradient-to-r from-gray-50 to-orange-50"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="mb-16" variants={fadeInUp}>
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
            <motion.button
              onClick={() => navigate("/dsa-visualizer")}
              className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold text-lg group"
              variants={fadeInUp}
            >
              Try Visualizers
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>
          </motion.div>

          <motion.div
            className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide"
            variants={staggerContainer}
          >
            {visualizers.map(({ src, title }, i) => (
              <motion.div
                key={i}
                onClick={() => navigate("/dsa-visualizer")}
                className="relative min-w-[280px] bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-200 gpu-accelerated"
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="py-20 bg-white"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about Codfolio
            </p>
          </motion.div>
          
          <motion.div className="space-y-4" variants={staggerContainer}>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                variants={fadeInUp}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left p-6 bg-white hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center"
                >
                  <span className="font-semibold text-gray-900 text-lg">{faq.question}</span>
                  <motion.span
                    className="text-orange-500 text-2xl font-light"
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {openIndex === index ? '−' : '+'}
                  </motion.span>
                </button>
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 bg-gray-50">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
