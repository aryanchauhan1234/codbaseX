// StackVisualizer.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const StackVisualizer = () => {
  const [stack, setStack] = useState([]);
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");

  const push = () => {
    if (value === "") return;
    if (stack.length >= 5) {
      setMessage("⚠ Stack Overflow!");
      return;
    }
    setStack([...stack, value]);
    setMessage(`✅ Pushed '${value}' to stack`);
    setValue("");
  };

  const pop = () => {
    if (stack.length === 0) {
      setMessage("⚠ Stack is empty!");
      return;
    }
    const popped = stack[stack.length - 1];
    setStack(stack.slice(0, -1));
    setMessage(`🗑️ Popped '${popped}' from stack`);
  };

  return (
    <div className="p-6 rounded-xl  ">
      <h2 className="text-2xl font-bold text-orange-700 mb-4">Stack (LIFO)</h2>
      <div className="text-sm text-orange-800 mb-4 h-6">{message}</div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          className="border px-3 py-2 rounded-lg shadow-inner focus:outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
        />
        <div className="flex gap-2">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded" onClick={push}>Push</button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={pop}>Pop</button>
        </div>
      </div>
      <div className="relative flex flex-col-reverse items-center border-2 border-orange-300 w-40 min-h-[300px] mx-auto py-2 bg-orange-50 rounded-lg">
        <div className="absolute top-1 left-1 text-xs bg-orange-600 text-white px-2 py-0.5 rounded">Top</div>
        <AnimatePresence>
          {stack.map((item, index) => (
            <motion.div
              key={item + index}
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -30 }}
              className="w-24 bg-orange-400 text-white text-center p-2 m-1 rounded-lg shadow"
            >
              {item}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Additional Info Section */}
      <div className="mt-10">
        <pre className="bg-gray-100 border border-gray-300 rounded-xl p-4 text-sm overflow-x-auto text-gray-800 font-mono">
{`#include <stack>
#include <iostream>
using namespace std;

int main() {
    stack<int> s;
    s.push(10);
    s.push(20);
    s.push(30);
    cout << "Top: " << s.top() << endl;
    s.pop();
    cout << "Top after pop: " << s.top() << endl;
    return 0;
}`}
        </pre>

        <div className="bg-orange-100 border border-orange-300 p-4 rounded-xl text-sm space-y-1 mt-6">
          <div>📦 Time Complexity: <strong>O(1)</strong> (for push/pop/top)</div>
          <div>💾 Space Complexity: <strong>O(n)</strong></div>
        </div>

        <div className="bg-white border border-orange-200 p-4 rounded-xl text-sm mt-6">
          <h4 className="text-orange-700 font-semibold mb-2">🔗 Practice Problems:</h4>
          <ul className="list-disc ml-6 space-y-1 text-blue-600 underline">
            <li><a href="https://leetcode.com/problems/min-stack/" target="_blank" rel="noreferrer">LeetCode - Min Stack</a></li>
            <li><a href="https://leetcode.com/problems/valid-parentheses/" target="_blank" rel="noreferrer">LeetCode - Valid Parentheses</a></li>
            <li><a href="https://leetcode.com/problems/largest-rectangle-in-histogram/" target="_blank" rel="noreferrer">LeetCode - Largest Rectangle in Histogram</a></li>
            <li><a href="https://leetcode.com/problems/daily-temperatures/" target="_blank" rel="noreferrer">LeetCode - Daily Temperatures</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StackVisualizer;
