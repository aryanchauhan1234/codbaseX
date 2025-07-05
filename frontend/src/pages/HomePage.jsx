import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = () => {
  const navigate = useNavigate();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="p-10 bg-white scroll-smooth mt-[4%]">
      {/* Hero Section */}
      <motion.div
        className="max-w-5xl mx-auto text-center space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-black font-extrabold text-5xl sm:text-6xl">
          Track, Analyze & Share
        </h1>
        <h2 className="text-gray-600 text-2xl sm:text-3xl font-semibold">
          <span className="text-orange-500">Codefolio</span> helps you navigate and track your coding journey to success
        </h2>
        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          <button
            onClick={() => navigate("/QuestionTracker")}
            className="bg-white text-black border border-black font-semibold py-2 px-6 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Question Tracker
          </button>
          <button
            onClick={() => navigate("/codeforces")}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg shadow transition"
          >
            Profile Tracker
          </button>
        </div>
      </motion.div>

      {/* Codeforces Tracker Section */}
      <motion.div
        className="flex flex-col lg:flex-row items-center justify-between mt-24 gap-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <img className="w-40 lg:w-60 rounded-xl object-contain" src="/photo1.png" alt="photo1" />
        <div className="text-center lg:w-[40%]">
          <h1 className="font-extrabold text-3xl">
            Track your <span className="text-orange-500">Codeforces</span> journey with us
          </h1>
        </div>
        <div className="border border-gray-300 rounded-2xl p-2 shadow hover:scale-105 transition-transform">
          <img className="rounded-lg object-contain" src="/1.png" alt="cf-demo" />
        </div>
      </motion.div>

      {/* Platform Section */}
      <motion.div
        className="mt-24 text-center max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-black font-extrabold text-4xl sm:text-5xl">Your Favourite Coding Platform</h1>
        <h2 className="text-gray-500 text-xl sm:text-2xl font-semibold mt-4">
          Streamlined in CodeTracker to simplify your coding journey
        </h2>
      </motion.div>

      {/* Problem Distribution Section */}
      <motion.div
        className="flex flex-col lg:flex-row mt-20 items-center gap-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="border w-full lg:w-[60%] border-gray-300 rounded-2xl p-2 shadow-md hover:scale-105 transition-transform">
          <img className="rounded-lg object-cover" src="/3.png" alt="distribution" />
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:w-[30%] text-center">
          <img className="w-32 lg:w-44 rounded-xl shadow-sm object-contain" src="/photo3.png" alt="illustration" />
          <h1 className="font-extrabold text-2xl lg:text-3xl">
            Your <span className="text-orange-500">problem</span> distribution and much more
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
        <h1 className="text-black font-extrabold text-4xl">Simplify Your Prep</h1>
        <h2 className="text-gray-500 text-2xl font-semibold mt-3">by tracking your contests on</h2>
      </motion.div>
      <motion.img
        onClick={() => navigate("/events")}
        className="w-full cursor-pointer my-10 rounded-xl shadow-md hover:scale-[1.01] transition-transform object-cover"
        src="/photo4.png"
        alt="event tracking"
        whileHover={{ scale: 1.02 }}
      />

      {/* Portfolio Section */}
      <motion.div
        className="mt-20 text-left w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-black font-extrabold text-4xl sm:text-5xl">
          Your <span className="text-orange-500">All-in-One</span> Coding Portfolio
        </h1>
        <h2
          onClick={() => navigate("/portfolio")}
          className="text-blue-500 mt-3 font-medium cursor-pointer hover:underline"
        >
          Get your Portfolio {'->'}
        </h2>
      </motion.div>
      <motion.img
        className="w-full cursor-pointer my-5 rounded-xl shadow-md border border-gray-200 hover:scale-105 transition-transform"
        src="/portfolio.png"
        alt="portfolio preview"
        whileHover={{ scale: 1.05 }}
      />

      {/* Card Unlock Section */}
      <motion.div
        className="mt-20 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-black font-extrabold text-4xl sm:text-5xl">
          <span className="text-orange-500">UNLOCK</span> your Codefolio CARD
        </h1>
        <h2
          onClick={() => navigate("/card")}
          className="text-blue-500 font-medium mt-4 cursor-pointer hover:underline"
        >
          Get your Card {'->'}
        </h2>
      </motion.div>
      <motion.img
        className="mx-auto w-60 sm:w-80 cursor-pointer my-6 border border-orange-500 rounded-2xl shadow-md hover:scale-105 transition-transform object-contain"
        src="/card.png"
        alt="card"
        whileHover={{ scale: 1.05 }}
      />

<motion.div
  className="mt-24 text-left w-full"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  <h1 className="text-black font-extrabold text-4xl sm:text-5xl">
    DSA <span className="text-orange-500">Visualizers</span> for quick learning
  </h1>
  <h2
    onClick={() => navigate("/dsa-visualizer")}
    className="text-blue-500 mt-3 font-medium cursor-pointer hover:underline"
  >
    Try Visualizers {'->'}
  </h2>

  <div className="flex overflow-x-auto gap-6 mt-10 pb-4 scrollbar-hide">
    {[
      { src: "/dij.png", title: "Dijkstra" },
      { src: "/dfs.png", title: "DFS" },
      { src: "/stack.png", title: "Stack" },
      { src: "/queue.png", title: "Queue" },
      { src: "/binarysearch.png", title: "Binary Search" },
      { src: "/quicksort.png", title: "QuickSort" },
    ].map(({ src, title }, i) => (
      <motion.div
        key={i}
        onClick={() => navigate("/dsa-visualizer")}
        whileHover={{ scale: 1.05 }}
        className="relative min-w-[320px] max-w-sm rounded-xl shadow-md overflow-hidden cursor-pointer transition-transform duration-300 border border-gray-200 bg-white"
      >
        <img
          src={src}
          alt={title}
          className="w-full h-56 object-contain bg-white rounded-t-xl"
        />
        <div className="absolute bottom-0 w-full bg-black/60 px-4 py-2">
          <h3 className="text-white font-semibold text-lg">{title} Visualizer</h3>
        </div>
      </motion.div>
    ))}
  </div>
</motion.div>


    </div>
  );
};

export default HomePage;
