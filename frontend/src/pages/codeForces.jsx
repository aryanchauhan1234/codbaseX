import CFHandleInput from "../components/handleInput";
import CfData from "../components/cfData";
import CfSubmissions from "../components/cfHeatmap";
import CfSubmissionsheat from "../components/cfSubmissions";
import CfRatingGraph from "../components/cfRatingGraph";
import CFProblemSolved from "../components/cfProblemSolved";
// import CFVerdictDistribution from "../components/CFVerdictDistribution";
import CFStreakTracker from "../components/CFStreakTracker";
import CFFastestAccepted from "../components/CFFastestAccepted";
import FloatingPersonalizeButton from "../components/FloatingPersonalizeButton";
import CFContestSolveTime from "../components/CFContestTime";
import { useCfStorestemp } from "../store/useCfStorestemp";
import Sidebar  from "../components/Sidebar.jsx";
// import Loader from "../components/Loader";
import { useAuthStore } from "../store/useAuthStore.js";
import { Loader } from "lucide-react";

const CodeForces = () => {
  const {isLoading } = useCfStorestemp();
  const {authUser} = useAuthStore();
  return (
    <div className="min-h-screen bg-gray-50 pt-[4%]  flex dark:bg-gray-900 dark:text-white transition-colors duration-500">
  {/* Main Content */}
   {isLoading && (
  <div className="fixed inset-0 z-50 flex justify-center items-center bg-white/70 dark:bg-gray-900 dark:text-white transition-colors duration-500">
    <Loader className="w-10 h-10 text-orange-500 animate-spin" />
  </div>
)}
    {authUser.cfHandle && <Sidebar/>}
  <main className=" flex-1  max-w-7xl mx-auto dark:bg-gray-900 dark:text-white transition-colors duration-500">
    {!authUser.cfHandle && <CFHandleInput />}

    {authUser.cfHandle && (
      <>
        <div className="dark:bg-gray-900 dark:text-white transition-colors duration-500">
          <div className="bg-white p-4 rounded-xl shadow-sm col-span-1 dark:bg-gray-900 dark:text-white transition-colors duration-500">
            <CfData />
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm col-span-1 dark:bg-gray-900 dark:text-white transition-colors duration-500">
            <CFStreakTracker />
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm col-span-1 dark:bg-gray-900 dark:text-white transition-colors duration-500">
            <CFContestSolveTime />
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm col-span-2 dark:bg-gray-900 dark:text-white transition-colors duration-500">
            <CfRatingGraph />
          </div>


          <div className="bg-white p-4 rounded-xl shadow-sm col-span-1 dark:bg-gray-900 dark:text-white transition-colors duration-500">
            <CFFastestAccepted />
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm col-span-1 dark:bg-gray-900 dark:text-white transition-colors duration-500">
            <CFProblemSolved />
          </div>

          {/* <div className="bg-white p-4 rounded-xl shadow-sm col-span-1"> */}
            {/* <CFVerdictDistribution />
          </div> */}

          <div className="bg-white p-4 rounded-xl shadow-sm col-span-2 dark:bg-gray-900 dark:text-white transition-colors duration-500">
            <CfSubmissions />
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm col-span-2 dark:bg-gray-900 dark:text-white transition-colors duration-500">
            <CfSubmissionsheat />
          </div>
        </div>

        <FloatingPersonalizeButton />
      </>
    )}
  </main>
</div>

  )
};

export default CodeForces;
