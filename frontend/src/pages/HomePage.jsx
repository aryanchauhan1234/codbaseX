import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ImageWithSkeleton from "../components/ImageWithSkeleton";
import Lottie from "lottie-react";
import codingAnimation from "../styles/coding home page.json";

const HomePage = () => {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const faqs = [
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
  ];

  const visualizers = [
    { src: "/dij.png", title: "Dijkstra" },
    { src: "/dfs.png", title: "DFS" },
    { src: "/stack.png", title: "Stack" },
    { src: "/queue.png", title: "Queue" },
    { src: "/binarysearch.png", title: "Binary Search" },
    { src: "/quicksort.png", title: "QuickSort" },
  ];

  return (
    <div className="relative overflow-hidden p-6 sm:p-12 bg-white/70 backdrop-blur-md border border-white/30 dark:bg-gray-900/70 dark:border-white/10 rounded-2xl shadow-xl transition">
      {/* Hero Section */}
      <motion.div
        className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* LEFT: Text Content */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Visualize. Track.
            <br />
            <span className="text-orange-500">& Compare.</span>
          </h1>
          <p className="text-gray-500 text-lg sm:text-xl font-medium max-w-xl">
            <span className="text-orange-500 font-semibold">Codfolio</span> helps you navigate and track your coding journey to success.
          </p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => navigate("/QuestionTracker")}
              className="border border-black dark:border-white font-semibold py-2.5 px-6 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition shadow"
            >
              Question Tracker
            </button>
            <button
              onClick={() => navigate("/codeforces")}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 px-6 rounded-xl transition shadow"
            >
              Profile Tracker
            </button>
          </div>
        </div>

        {/* RIGHT: Lottie Animation */}
        <div className="flex justify-center md:justify-end">
          <Lottie
            animationData={codingAnimation}
            loop
            autoplay
            className="w-[300px] sm:w-[350px] md:w-[400px] xl:w-[450px]"
          />
        </div>
      </motion.div>

      {/* Codeforces Tracker Section */}
      <motion.div
        className="flex flex-col lg:flex-row items-center mt-10 justify-between gap-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <ImageWithSkeleton className="w-[40%] rounded-xl  object-contain  " src="/photo1.png" alt="photo1" />
        <div className="text-center lg:w-[50%] ">
          <h1 className="font-extrabold text-3xl">
            <span className="text-5xl">T</span>rack Your{" "}
            <span className="text-orange-500"><span className="text-4xl">C</span>odeforces</span> Journey with Us
          </h1>
        </div>
        <div className=" border-2 border-orange-500 rounded-3xl p-1 shadow hover:scale-105 transition-transform">
          <ImageWithSkeleton className="rounded-3xl object-contain " src="/1.png" alt="cf-demo" />
        </div>
      </motion.div>

      {/* Problem Distribution Section */}
      <motion.div
        className="flex flex-col lg:flex-row mt-20 items-center gap-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full lg:w-[60%] border-2 border-orange-500 rounded-3xl p-1 shadow-md hover:scale-105 transition-transform">
          <ImageWithSkeleton className="rounded-lg object-cover" src="/3.png" alt="distribution" />
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:w-[30%] text-center">
          <h1 className="font-extrabold text-2xl lg:text-4xl">
            <span className="text-5xl">Y</span>our{" "}
            <span className="text-orange-500">Ratings</span> Distribution and much more...
          </h1>
        </div>
      </motion.div>

      {/* Contest Tracker Section */}
      <motion.div
        className="mt-24 max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-extrabold text-4xl">Simplify Your Prep</h1>
        <h2 className="text-gray-400 text-2xl font-semibold mt-3">by tracking your contests on</h2>
      </motion.div>
      <motion.div whileHover={{ scale: 1.02 }}>
        <ImageWithSkeleton
          className="w-full cursor-pointer my-10 rounded-3xl  p-1 shadow-md hover:scale-[1.01] transition-transform object-cover border-2 border-orange-500"
          src="/photo4.png"
          alt="event tracking"
        />
      </motion.div>

      {/* Portfolio Section */}
      <motion.div className="mt-20 text-left w-full" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h1 className=" font-extrabold text-4xl sm:text-5xl">
          Your <span className="text-orange-500">All-in-One</span> Coding Portfolio
        </h1>
        <h2 onClick={() => navigate("/portfolio")} className="text-blue-500 mt-3 font-medium cursor-pointer hover:underline">
          Get your Portfolio {'->'}
        </h2>
      </motion.div>
      <ImageWithSkeleton
        className="w-full cursor-pointer my-5 rounded-3xl p-1 shadow-md hover:scale-105 transition-transform object-cover border-2 border-orange-500"
        src="/portfolio.png"
        alt="portfolio preview"
      />

      {/* Card Section */}
      <motion.div className="mt-20 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h1 className=" font-extrabold text-4xl sm:text-5xl">
          <span className="text-orange-500">UNLOCK</span> your Codefolio CARD
        </h1>
        <h2 onClick={() => navigate("/card")} className="text-blue-500 font-medium mt-4 cursor-pointer hover:underline">
          Get your Card {'->'}
        </h2>
      </motion.div>
      <ImageWithSkeleton
        className="mx-auto w-60 sm:w-80 cursor-pointer my-6 rounded-2xl shadow-md hover:scale-105 transition-transform object-contain"
        src="/card.png"
        alt="card"
      />

      {/* Visualizer Section */}
      <motion.div className="mt-24 text-left w-full" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <h1 className="font-extrabold text-4xl sm:text-5xl">
          DSA <span className="text-orange-500">Visualizers</span> for quick learning
        </h1>
        <h2 onClick={() => navigate("/dsa-visualizer")} className="text-blue-500 mt-3 font-medium cursor-pointer hover:underline">
          Try Visualizers {'->'}
        </h2>

        <div className="flex overflow-x-auto gap-6 mt-10 pb-4 scrollbar-hide">
          {visualizers.map(({ src, title }, i) => (
            <motion.div
              key={i}
              onClick={() => navigate("/dsa-visualizer")}
              whileHover={{ scale: 1.05 }}
              className="relative min-w-[320px] max-w-sm rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform duration-300  bg-white"
            >
              <ImageWithSkeleton src={src} alt={title} className="w-full h-56 object-contain bg-white rounded-t-xl" />
              <div className="absolute bottom-0 w-full bg-black/60 px-4 py-2">
                <h3 className="text-white font-semibold text-lg">{title} Visualizer</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-4 mt-24">
        <h2 className="text-3xl sm:text-4xl font-bold text-center  mb-8">
          Frequently asked <span className="text-orange-500">questions</span>
        </h2>
        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-300 pb-4 pt-3 cursor-pointer"
              onClick={() => setOpenIndex(prev => (prev === index ? null : index))}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-base sm:text-lg font-medium ">{faq.question}</h3>
                <span className="text-xl font-bold">{openIndex === index ? "−" : "+"}</span>
              </div>
              {openIndex === index && <p className=" mt-2 text-gray-400 text-sm">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
