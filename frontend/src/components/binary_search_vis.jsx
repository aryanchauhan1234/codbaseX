import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";

const BinarySearchVisualizer = () => {
  const [inputArray, setInputArray] = useState("1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ");
  const [target, setTarget] = useState("4");
  const [sortedArray, setSortedArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [started, setStarted] = useState(false);

  const prepareSteps = (arr, x) => {
    const logs = [];
    let low = 0,
      high = arr.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const midVal = arr[mid];

      let explanation = `🔍 Checking middle index ${mid} (value = ${midVal})\n`;
      if (midVal === x) {
        explanation += `🎯 Found target ${x} at index ${mid}`;
        logs.push({ low, mid, high, explanation, found: true });
        return logs;
      } else if (midVal < x) {
        explanation += `${midVal} < ${x}, so move right.`;
        logs.push({ low, mid, high, explanation });
        low = mid + 1;
      } else {
        explanation += `${midVal} > ${x}, so move left.`;
        logs.push({ low, mid, high, explanation });
        high = mid - 1;
      }
    }

    logs.push({ explanation: `❌ Target ${x} not found.`, found: false });
    return logs;
  };

  const handleStart = () => {
    let arr = inputArray
      .split(",")
      .map((s) => parseInt(s.trim()))
      .filter((v) => !isNaN(v));

    if (arr.length === 0 || arr.length > 50) return alert("Enter up to 10 valid numbers.");
    const tgt = parseInt(target);
    if (isNaN(tgt)) return alert("Enter a valid target number.");
    arr = arr.sort((a, b) => a - b);
    setSortedArray(arr);
    setSteps(prepareSteps(arr, tgt));
    setStarted(true);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep + 1 < steps.length && !steps[currentStep]?.found) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const reset = () => {
    setInputArray("1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ");
    setTarget("4");
    setSortedArray([]);
    setSteps([]);
    setCurrentStep(0);
    setStarted(false);
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-10">
      <h2 className="text-4xl font-bold text-orange-600 text-center">
        Binary Search Visualizer
      </h2>

      {/* Input Form */}
      {!started ? (
        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Enter array (e.g. 5, 2, 9)"
            value={inputArray}
            onChange={(e) => setInputArray(e.target.value)}
            className="border border-gray-300 rounded-xl p-3 dark:bg-gray-900 dark:text-white transition-colors duration-500"
          />
          <input
            type="text"
            placeholder="Enter target value"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="border border-gray-300 rounded-xl p-3 dark:bg-gray-900 dark:text-white transition-colors duration-500"
          />
          <button
            onClick={handleStart}
            className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-xl col-span-2"
          >
            🎬 Start Visualization
          </button>
        </div>
      ) : ""}

      {/* Visualization */}
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-center gap-4 flex-wrap">
          {sortedArray.map((num, idx) => {
            const isMid = idx === steps[currentStep]?.mid;
            const isLow = idx === steps[currentStep]?.low;
            const isHigh = idx === steps[currentStep]?.high;
            const isFound = steps[currentStep]?.found && idx === steps[currentStep]?.mid;

            return (
              <div
                key={idx}
                className={`w-14 h-14 flex items-center justify-center rounded-lg font-semibold  transition-all duration-300 shadow-md
                  ${isFound
                    ? "bg-yellow-300 text-black text-4xl border border-black animate-bounce" 
                    : isMid
                      ? "bg-blue-500 text-black text-4xl"
                      : isLow
                        ? "bg-green-500 text-black text-4xl "
                        : isHigh
                          ? "bg-red-500 text-black text-4xl "
                          : "bg-white text-black border border-black"}`}
              >
                {num}
              </div>
            );
          })}
        </div>

        {started ? (
          <div className="px-[27%] bg-orange-50 border border-orange-200 rounded-xl p-4 text-lg whitespace-pre-wrap text-orange-900 font-bold mt-5">
            {steps[currentStep]?.explanation}
          </div>
        ) : ""}

        {steps[currentStep]?.found && (
          <div className="text-center text-2xl font-bold text-green-600 animate-bounce mt-[3%]">
            🎉 Target Found Successfully!
          </div>
        )}

        {/* Controls */}
        {started ? (
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 mb-10">
            <button
              onClick={nextStep}
              disabled={currentStep + 1 >= steps.length || steps[currentStep]?.found}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-2xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              ⏭️ Next Step
            </button>

            <button
              onClick={reset}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-2xl shadow-sm border  dark:bg-gray-900 dark:border-white dark:text-white transition-colors duration-500"
            >
              🔄 Reset
            </button>
          </div>
        ) : ""}

        {/* Code and Resources */}
        <Card className="shadow-xl border rounded-2xl">
          <div className="pt-6 space-y-4 ">
            {/* <h3 className="text-lg font-semibold text-gray-800">🧠 C++ Code</h3> */}
            <pre className="bg-gray-100 border border-gray-300 rounded-xl p-4 text-sm overflow-x-auto text-gray-800 font-mono dark:bg-gray-900 dark:text-white transition-colors duration-500">
{`int binarySearch(vector<int>& arr, int x) {
    int low = 0, high = arr.size() - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (arr[mid] == x) return mid;
        else if (arr[mid] < x) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`}
            </pre>

            <div className="bg-orange-100 border border-orange-300 p-4 rounded-xl text-sm space-y-1 dark:bg-gray-900 dark:text-white transition-colors duration-500">
              <div>📦 Time Complexity: <strong>O(log n)</strong></div>
              <div>💾 Space Complexity: <strong>O(1)</strong></div>
            </div>

            <div className="bg-white border border-orange-200 p-4 rounded-xl text-sm dark:bg-gray-900 dark:text-white transition-colors duration-500">
              <h4 className="text-orange-700 font-semibold mb-2">
                🔗 Practice Problems:
              </h4>
              <ul className="list-disc ml-6 space-y-1 text-blue-600 underline">
                <li>
                  <a href="https://leetcode.com/problems/binary-search/" target="_blank" rel="noreferrer">
                    LeetCode - Binary Search
                  </a>
                </li>
                <li>
                  <a href="https://www.geeksforgeeks.org/binary-search/" target="_blank" rel="noreferrer">
                    GFG - Binary Search
                  </a>
                </li>
                <li>
                  <a href="https://codeforces.com/problemset/problem/812/B" target="_blank" rel="noreferrer">
                    Codeforces 812B - Sagheer and Binary Search
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </CardContent>
    </div>
  );
};

export default BinarySearchVisualizer;
