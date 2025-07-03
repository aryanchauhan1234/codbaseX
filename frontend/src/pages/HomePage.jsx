import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="p-10 bg-white scroll-smooth mt-[4%] ">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <h1 className="text-black font-extrabold text-5xl sm:text-6xl">
          Track, Analyze & Share
        </h1>
        <h2 className="text-gray-500 text-2xl sm:text-3xl font-semibold">
          <span className="text-orange-500">Codefolio</span> helps you navigate and track your coding journey to success
        </h2>
        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          <button
            onClick={() => navigate("/")}
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
      </div>

      {/* Codeforces Tracker Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between mt-24 gap-10">
        <img
          className="w-40 lg:w-60 rounded-xl  object-contain"
          src="/photo1.png"
          alt="photo1"
        />
        <div className="text-center lg:w-[40%]">
          <h1 className="font-extrabold text-3xl">
            Track your <span className="text-orange-500">Codeforces</span> journey with us
          </h1>
        </div>
        <div className="border border-gray-300 rounded-2xl p-2 shadow hover:scale-105 transition-transform">
          <img className="rounded-lg object-contain" src="/1.png" alt="cf-demo" />
        </div>
      </div>

      {/* Platform Section */}
      <div className="mt-24 text-center max-w-4xl mx-auto">
        <h1 className="text-black font-extrabold text-4xl sm:text-5xl">
          Your Favourite Coding Platform
        </h1>
        <h2 className="text-gray-500 text-xl sm:text-2xl font-semibold mt-4">
          Streamlined in CodeTracker to simplify your coding journey
        </h2>
      </div>

      {/* Problem Distribution Section */}
      <div className="flex flex-col lg:flex-row mt-20 items-center gap-10">
        <div className="border w-full lg:w-[60%] border-gray-300 rounded-2xl p-2 shadow-md hover:scale-105 transition-transform" >
          <img className="rounded-lg object-cover " src="/3.png" alt="distribution" />
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-4 lg:w-[30%] text-center">
          <img
            className="w-32 lg:w-44 rounded-xl  shadow-sm object-contain "
            src="/photo3.png"
            alt="illustration"
          />
          <h1 className="font-extrabold text-2xl lg:text-3xl">
            Your <span className="text-orange-500">problem</span> distribution and much more
          </h1>
        </div>
      </div>

      {/* Contest Tracker Section */}
      <div className="mt-24 max-w-3xl">
        <h1 className="text-black font-extrabold text-4xl">Simplify Your Prep</h1>
        <h2 className="text-gray-500 text-2xl font-semibold mt-3">
          by tracking your contests on
        </h2>
      </div>
      <img
        onClick={() => navigate("/events")}
        className="w-full cursor-pointer my-10 rounded-xl shadow-md hover:scale-[1.01] transition-transform object-cover"
        src="/photo4.png"
        alt="event tracking"
      />

      {/* Portfolio Section */}
      <div className="mt-20 text-left w-full">
        <h1 className="text-black font-extrabold text-4xl sm:text-5xl">
          Your <span className="text-orange-500">All-in-One</span> Coding Portfolio
        </h1>
        <h2
          onClick={() => navigate("/portfolio")}
          className="text-blue-500 mt-3 font-medium cursor-pointer hover:underline"
        >
          Get your Portfolio {'->'}
        </h2>
      </div>
      <img
        className="w-full cursor-pointer my-5 rounded-xl shadow-md border border-gray-200 hover:scale-105 transition-transform"
        src="/portfolio.png"
        alt="portfolio preview"
      />

      {/* Card Unlock Section */}
      <div className="mt-20 text-center">
        <h1 className="text-black font-extrabold text-4xl sm:text-5xl">
          <span className="text-orange-500">UNLOCK</span> your Codefolio CARD
        </h1>
        <h2
          onClick={() => navigate("/card")}
          className="text-blue-500 font-medium mt-4 cursor-pointer hover:underline"
        >
          Get your Card {'->'}
        </h2>
      </div>
      <img
        className="mx-auto w-60 sm:w-80 cursor-pointer my-6 border border-orange-500 rounded-2xl shadow-md hover:scale-105 transition-transform object-contain"
        src="/card.png"
        alt="card"
      />
    </div>
  );
};

export default HomePage;
