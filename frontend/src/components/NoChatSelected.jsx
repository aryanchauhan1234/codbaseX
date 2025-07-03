import { Code, MousePointerClick, Brain, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// import ProfilePage from "../pages/ProfilePage";
const NoChatSelected = () => {
  const navigate = useNavigate();

  return (
    <div className=" w-screen  scroll-smooth">
      <div className="w-[70%] mx-auto ">
        <div>
          <h1 className="text-black font-extrabold text-6xl">Track , analyze & share</h1>
          <h2 className="text-gray-500 text-3xl mt-6 font-semibold text-center">Code<span className="text-orange-500">Tracker</span>  helps you navigate and track your
            coding journey to successQuestion Tracker
          </h2>
        </div>
        <div className="flex gap-4 justify-center mt-5">
          <button onClick={() => navigate("/")} className="bg-white text-black-500 border border-black-800 font-semibold py-1 px-10 rounded-lg shadow-sm  transition duration-200">
            Question Tracker
          </button>
          <button onClick={() => navigate("/codeforces")} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-1 px-10 rounded-lg shadow-md transition duration-200">
            Profile Tracker
          </button>

        </div>
      </div>
      {/* <div className="flex"> */}
      <div className="flex mt-[15%] justify-between">
        <img className=" w-[20%] h-[20%]" src="/photo1.png" alt="" />
        <div className=" w-[40%]  mt-5">
          <h className=" font-extrabold text-3xl text-center">track your Code<span className="text-orange-500">Forces</span> journey With Me</h>
        </div>
        <div className="border  border-gray-900 rounded-2xl p-2 mx-10">
          <img src="/1.png" alt="" />
        </div>
      </div>
      <div className=" mx-auto w-[70%] mt-20">
        <h1 className="text-black font-extrabold text-5xl">Your Favourite Coding Platform</h1>
        <h2  className="text-gray-500 text-3xl mt-6 font-semibold text-center" >Streamlined in Codolio to simplify your
          coding journey</h2>
      </div>

      <div className=" flex mx-auto  mt-[15%] gap-[5%]">
        <div className="border  w-[60%] border-gray-900 rounded-2xl p-2">
          <img src="/3.png" alt="" />
        </div>
        <div className=" w-[30%]  mt-5 flex">
        <img className=" w-[80%] h-[80%]" src="/photo3.png" alt="" />
        <h1 className=" font-extrabold text-3xl ">Your pro<span className="text-orange-500">blems</span> distributions and much more.. </h1>
      </div>

      </div>
<div className="  w-[50%] mt-20">
        <h1 className="text-black font-extrabold text-5xl">Simplify Your Prep</h1>
        <h2  className="text-gray-500 text-3xl mt-6 font-semibold" >by tracking your contests on</h2>
    </div>
        <img onClick={() => navigate("/events")} className="w-[80%] cursor-pointer my-10" src="/photo4.png" alt="" />
    </div>
  );
};

export default NoChatSelected;
