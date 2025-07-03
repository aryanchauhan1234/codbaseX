import { Code2 } from "lucide-react"; // Optional: keep for vibe

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-50">
      {/* Rotating Sand Timer */}
      <div className="animate-spin-slow text-5xl mb-4">
        ⏳
      </div>

      {/* Optional: add Code icon below or beside */}
      {/* <div className="animate-spin-slow mb-2 text-blue-600">
        <Code2 size={48} />
      </div> */}

      <div className="text-xl font-mono text-gray-800 animate-pulse">
        Crunching Codeforces Stats...
      </div>
      <div className="mt-2 text-sm text-gray-500 font-mono">
        Fetching submissions, contests, ratings ⌛
      </div>
    </div>
  );
};

export default Loader;
