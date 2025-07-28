// QueueVisualizer.jsx
import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

const QueueVisualizer = () => {
  const [queue, setQueue] = useState([]);
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");

  const enqueue = () => {
    if (value === "") return;
    if (queue.length >= 5) {
      setMessage("⚠ Queue Overflow!");
      return;
    }
    setQueue([...queue, value]);
    setMessage(`✅ Enqueued '${value}' to rear`);
    setValue("");
  };

  const dequeue = () => {
    if (queue.length === 0) {
      setMessage("⚠ Queue is empty!");
      return;
    }
    const dequeued = queue[0];
    setQueue(queue.slice(1));
    setMessage(`🗑️ Dequeued '${dequeued}' from front`);
  };

  const renderInfoSection = () => (
    <Card className="shadow-xl border rounded-2xl mt-10  ">
      <CardContent className="pt-6 space-y-4 ">
        {/* <h3 className="text-lg font-semibold text-gray-800 ">🧠 C++ Code</h3> */}
        <pre className="bg-gray-100 border border-gray-300 dark:bg-gray-900 dark:text-white transition-colors duration-500 rounded-xl p-4 text-sm overflow-x-auto text-gray-800 font-mono">
{`#include <queue>
#include <iostream>
using namespace std;

int main() {
    queue<int> q;
    q.push(10);
    q.push(20);
    q.push(30);
    cout << "Front: " << q.front() << endl;
    q.pop();
    cout << "Front after pop: " << q.front() << endl;
    return 0;
}`}
        </pre>

        <div className="bg-orange-100 border border-orange-300 p-4 rounded-xl text-sm space-y-1 mt-10 dark:bg-gray-900 dark:text-white transition-colors duration-500">
          <div>📦 Time Complexity: <strong>O(1)</strong> (for push/pop)</div>
          <div>💾 Space Complexity: <strong>O(n)</strong></div>
        </div>

        <div className="bg-white border border-orange-200 p-4 rounded-xl text-sm mt-10 dark:bg-gray-900 dark:text-white transition-colors duration-500">
          <h4 className="text-orange-700 font-semibold mb-2">🔗 Practice Problems:</h4>
          <ul className="list-disc ml-6 space-y-1 text-blue-600 underline">
            <li><a href="https://leetcode.com/problems/implement-queue-using-stacks/" target="_blank" rel="noreferrer">LeetCode - Implement Queue using Stacks</a></li>
            <li><a href="https://leetcode.com/problems/sliding-window-maximum/" target="_blank" rel="noreferrer">LeetCode - Sliding Window Maximum</a></li>
            <li><a href="https://leetcode.com/problems/number-of-recent-calls/" target="_blank" rel="noreferrer">LeetCode - Number of Recent Calls</a></li>
            <li><a href="https://leetcode.com/problems/rotting-oranges/" target="_blank" rel="noreferrer">LeetCode - Rotting Oranges</a></li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-4 ">
      <h2 className="text-2xl font-bold mb-[5%] text-orange-700 ">Queue (FIFO)</h2>
      <div className="text-sm text-gray-700 mb-2 h-6 dark:text-white transition-colors duration-500">{message}</div>
      <div className="flex gap-2 mb-4 flex-wrap   ">
        <input
          className="border px-2 py-1 rounded border-orange-600 dark:bg-gray-900 dark:text-white transition-colors duration-500 "
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
        />
        <button className="bg-orange-500 text-white px-3 py-1 rounded" onClick={enqueue}>Enqueue</button>
        <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={dequeue}>Dequeue</button>
      </div>

      <div className="relative flex gap-2 border-2 min-h-[100px] items-center px-2 bg-orange-50  mt-[10%] mb-[5%] rounded-xl border-orange-300">
        <div className="absolute left-2 -top-5 text-xs bg-red-600 text-white px-1 rounded">Front</div>
        <div className="absolute right-2 -top-5 text-xs bg-red-600 text-white px-1 rounded ">Rear</div>
        <AnimatePresence>
          {queue.map((item, index) => (
            <motion.div
              key={item + index}
              initial={{ opacity: 0, scale: 0.5, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.5, x: -30 }}
              className="w-20 bg-orange-400 text-center p-1 rounded shadow"
            >
              {item}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {renderInfoSection()}
    </div>
  );
};

export default QueueVisualizer;