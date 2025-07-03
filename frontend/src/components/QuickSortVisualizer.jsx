import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";

const QuickSortVisualizer = () => {
  const [inputArray, setInputArray] = useState("10, 5, 2, 3, 7, 6, 4, 8, 9, 1");
  const [sortedArray, setSortedArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [started, setStarted] = useState(false);

  const quickSortSteps = (arr) => {
    const logs = [];

    const partition = (arr, low, high) => {
      let pivot = arr[high];
      let i = low - 1;
      for (let j = low; j < high; j++) {
        logs.push({ array: [...arr], pivotIndex: high, comparing: j });
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          logs.push({ array: [...arr], swapped: [i, j] });
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      logs.push({ array: [...arr], swapped: [i + 1, high] });
      return i + 1;
    };

    const quickSort = (arr, low, high) => {
      if (low < high) {
        let pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
      }
    };

    const arrCopy = [...arr];
    quickSort(arrCopy, 0, arrCopy.length - 1);
    return logs;
  };

  const handleStart = () => {
    let arr = inputArray
      .split(",")
      .map((s) => parseInt(s.trim()))
      .filter((v) => !isNaN(v));
    if (arr.length === 0 || arr.length > 50) return alert("Enter up to 50 valid numbers.");
    const logs = quickSortSteps(arr);
    setSortedArray(arr);
    setSteps(logs);
    setStarted(true);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep + 1 < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const reset = () => {
    setInputArray("10, 5, 2, 3, 7, 6, 4, 8, 9, 1");
    setSortedArray([]);
    setSteps([]);
    setCurrentStep(0);
    setStarted(false);
  };

  const state = steps[currentStep];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-10">
      <h2 className="text-4xl font-bold text-orange-600 text-center">Quick Sort Visualizer</h2>

      {!started ? (
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Enter array (e.g. 10, 2, 5)"
            value={inputArray}
            onChange={(e) => setInputArray(e.target.value)}
            className="border border-gray-300 rounded-xl p-3"
          />
          <button
            onClick={handleStart}
            className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-xl col-span-2"
          >
            🎬 Start Visualization
          </button>
        </div>
      ) : ""}

      <CardContent className="p-6 space-y-6">
        <div className="flex justify-center gap-4 flex-wrap">
          {state?.array?.map((num, idx) => {
            const isComparing = idx === state?.comparing;
            const isPivot = idx === state?.pivotIndex;
            const isSwapped = state?.swapped?.includes(idx);

            return (
              <div
                key={idx}
                className={`w-14 h-14 flex items-center justify-center rounded-lg font-semibold transition-all duration-300 shadow-md
                  ${isSwapped
                    ? "bg-yellow-400 text-black animate-bounce"
                    : isPivot
                    ? "bg-red-400 text-white"
                    : isComparing
                    ? "bg-blue-400 text-white"
                    : "bg-gray-400 text-white"}`}
              >
                {num}
              </div>
            );
          })}
        </div>

        {started ? (
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 mb-10">
            <button
              onClick={nextStep}
              disabled={currentStep + 1 >= steps.length}
              className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-2xl shadow-md disabled:opacity-50"
            >
              ⏭️ Next Step
            </button>

            <button
              onClick={reset}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-2xl shadow-sm"
            >
              🔄 Reset
            </button>
          </div>
        ) : ""}

        <Card className="shadow-xl border rounded-2xl">
          <div className="pt-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">🧠 C++ Code</h3>
            <pre className="bg-gray-100 border border-gray-300 rounded-xl p-4 text-sm overflow-x-auto text-gray-800 font-mono">
{`void quickSort(vector<int>& arr, int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}`}            </pre>
            <div className="bg-orange-100 border border-orange-300 p-4 rounded-xl text-sm space-y-1">
              <div>📦 Time Complexity: <strong>O(n log n)</strong></div>
              <div>💾 Space Complexity: <strong>O(log n)</strong></div>
            </div>
          </div>
        </Card>
      </CardContent>
    </div>
  );
};

export default QuickSortVisualizer;