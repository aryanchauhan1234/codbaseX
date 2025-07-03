import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { motion } from "framer-motion";

const algorithms = {
  "Binary Search": {
    description: `Find the index of a target in a sorted array using binary search.`,
    visual: `
Step 1:   [1, 3, 5, 7, 9, 11]
              ^        ^
            low      high
            mid = 2 → arr[2] = 5 → too small → move right

Step 2:             [5, 7, 9, 11]
                      ^     ^
                    low   high
                    mid = 4 → arr[4] = 9 → too big → move left

Step 3:             [5, 7, 9]
                      ^
                    low=high=3 → arr[3] = 7 → 🎯 Found!
    `,
    code: `int binarySearch(vector<int>& arr, int x) {
    int low = 0, high = arr.size() - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (arr[mid] == x) return mid;
        else if (arr[mid] < x) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
    testcase: `arr = [1, 3, 5, 7, 9, 11]
x = 7
Output: 3`,

  },

  "Merge Sort": {
    description: "Sort an array using divide and conquer.",
    visual: `
            [4, 2, 5, 1]
           /           \\
        [4,2]         [5,1]
       /    \\        /    \\
     [4]   [2]     [5]    [1]
       \\    /        \\    /
      [2,4]         [1,5]
           \\       /
         [1,2,4,5]
    `,
    code: `void mergeSort(vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = (l + r) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}`,
    testcase: `Input: [4, 2, 5, 1]
Output: [1, 2, 4, 5]`
  },

  "Linear Search": {
    description: "Search each element one by one in the array.",
    visual: `
Step 1: [2, 4, 6, 8, 10]
         ^
        index = 0 → arr[0] = 2 → not target

Step 2: [2, 4, 6, 8, 10]
             ^
        index = 1 → arr[1] = 4 → not target

Step 3: [2, 4, 6, 8, 10]
                 ^
        index = 2 → arr[2] = 6 → 🎯 Found!
    `,
    code: `int linearSearch(vector<int>& arr, int x) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == x) return i;
    }
    return -1;
}`,
    testcase: `arr = [2, 4, 6, 8, 10]
x = 6
Output: 2`
  },

  "Bubble Sort": {
    description: "Sort the array by repeatedly swapping adjacent elements if they are in the wrong order.",
    visual: `
Initial: [5, 3, 8, 4]

Pass 1:  [3, 5, 4, 8] → swapped (5,3), then (8,4)

Pass 2:  [3, 4, 5, 8] → swapped (5,4)

Sorted!
    `,
    code: `void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1])
                swap(arr[j], arr[j + 1]);
        }
    }
}`,
    testcase: `Input: [5, 3, 8, 4]
Output: [3, 4, 5, 8]`
  },

  "Breadth-First Search (BFS)": {
    description: "Traverse the graph level by level using a queue.",
    visual: `
Graph: 0 — 1 — 2
         |
         3

Start at node 0
Queue: [0]
Visited: [0]

Visit 1 → Queue: [1]
Visit 2 → Queue: [2]
Visit 3 → Queue: [3]

Traversal Order: 0 → 1 → 2 → 3
    `,
    code: `void bfs(int start, vector<vector<int>>& adj) {
    vector<bool> visited(adj.size(), false);
    queue<int> q;
    q.push(start);
    visited[start] = true;

    while (!q.empty()) {
        int node = q.front(); q.pop();
        cout << node << " ";
        for (int neighbor : adj[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}`,
    testcase: `Graph: [[1], [0, 2, 3], [1], [1]]
Start = 0
Output: 0 1 2 3`
  },
  "Quick Sort": {
  description: "Divide and conquer algorithm that picks a pivot and partitions the array around the pivot.",
  visual: `
Step 1: [4, 1, 3, 9, 7]
        pivot = 4

Partition:
  [1, 3] [4] [9, 7] → elements rearranged

Recursively sort [1, 3] → [1, 3]
Recursively sort [9, 7] → [7, 9]

Final: [1, 3, 4, 7, 9]
  `,
  code: `int partition(vector<int>& arr, int low, int high) {
  int pivot = arr[high];
  int i = low - 1;
  for (int j = low; j < high; j++) {
      if (arr[j] <= pivot) {
          i++;
          swap(arr[i], arr[j]);
      }
  }
  swap(arr[i + 1], arr[high]);
  return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
  if (low < high) {
      int pi = partition(arr, low, high);
      quickSort(arr, low, pi - 1);
      quickSort(arr, pi + 1, high);
  }
}`,
  testcase: `Input: [4, 1, 3, 9, 7]
Output: [1, 3, 4, 7, 9]`
},
"Depth-First Search (DFS)": {
  description: "Traverse a graph by going as deep as possible before backtracking.",
  visual: `
Graph: 0 — 1 — 2
         |
         3

Start at node 0

Visit 1 → Visit 2
Backtrack → Visit 3

Traversal Order: 0 → 1 → 2 → 3
  `,
  code: `void dfs(int node, vector<vector<int>>& adj, vector<bool>& visited) {
  visited[node] = true;
  cout << node << " ";
  for (int neighbor : adj[node]) {
      if (!visited[neighbor]) {
          dfs(neighbor, adj, visited);
      }
  }
}`,
  testcase: `Graph: [[1], [0, 2, 3], [1], [1]]
Start = 0
Output: 0 1 2 3`
},
"Dijkstra's Algorithm": {
  description: "Find the shortest paths from a source node to all other nodes using a priority queue.",
  visual: `
Graph:
  0 → 1 (2)
  0 → 2 (4)
  1 → 2 (1)

Start at 0:
  dist[0] = 0
  dist[1] = 2 → via 0
  dist[2] = 3 → via 1

Shortest distances: [0, 2, 3]
  `,
  code: `void dijkstra(int src, vector<vector<pair<int, int>>>& adj, vector<int>& dist) {
  priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
  dist[src] = 0;
  pq.push({0, src});

  while (!pq.empty()) {
      int u = pq.top().second;
      int d = pq.top().first;
      pq.pop();

      if (d > dist[u]) continue;

      for (auto [v, w] : adj[u]) {
          if (dist[u] + w < dist[v]) {
              dist[v] = dist[u] + w;
              pq.push({dist[v], v});
          }
      }
  }
}`,
  testcase: `Graph: 0→1(2), 0→2(4), 1→2(1)
Start = 0
Output: [0, 2, 3]`
},
"Fibonacci (DP)": {
  description: "Compute Fibonacci numbers using memoization (top-down dynamic programming).",
  visual: `
fib(5) = fib(4) + fib(3)
       = (fib(3) + fib(2)) + (fib(2) + fib(1))
       ...

Store intermediate results:
memo[2] = 1
memo[3] = 2
memo[4] = 3
memo[5] = 5
  `,
  code: `int fib(int n, vector<int>& memo) {
  if (n <= 1) return n;
  if (memo[n] != -1) return memo[n];
  return memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
}`,
  testcase: `n = 5
Output: 5`
},


};

const DsaVisualizer = () => {
  const [selected, setSelected] = useState("Binary Search");
  const algo = algorithms[selected];
  const [step, setStep] = useState(0);
  const lines = algo.visual.trim().split("\n");

  useEffect(() => {
    setStep(0);
    const interval = setInterval(() => {
      setStep((prev) => (prev < lines.length ? prev + 1 : prev));
    }, 300);
    return () => clearInterval(interval);
  }, [selected]);

  const boldWords = [
    "low", "high", "mid", "Found", "move", "too small", "too big",
    "index", "swap", "Queue", "Visited", "pivot", "partition", "dist", "memo", "shortest"
  ];

  return (
    <div className="flex max-w-7xl mx-auto py-[4%] mb-40">
      <div className="w-1/4 border-r border-gray-200 p-4">
        <h2 className="text-3xl font-semibold text-black mb-6">  Algorithms</h2>
        <ul className="space-y-2">
          {Object.keys(algorithms).map((name) => (
            <li
              key={name}
              className={`cursor-pointer px-3 py-2 rounded-xl hover:bg-orange-100 transition ${
                selected === name ? "bg-orange-100 font-bold text-orange-700" : ""
              }`}
              onClick={() => setSelected(name)}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>

      <div className="w-3/4 p-6">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="bg-white rounded-2xl shadow-md border border-orange-200">
            <CardContent className="space-y-6 pt-6 text-gray-800">
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-orange-600">
                  {selected}
                </h2>
                <p className="text-gray-700">{algo.description}</p>
              </div>

              {algo.image && (
                <img
                  src={algo.image}
                  alt={`${selected} illustration`}
                  className="rounded-xl border border-gray-200 shadow"
                />
              )}

              <div className="bg-orange-50 border border-orange-200 p-4 font-mono whitespace-pre-wrap rounded-xl overflow-x-auto text-sm leading-relaxed">
                {lines.slice(0, step).map((line, index) => {
                  const pattern = new RegExp(`\\b(${boldWords.join("|")})\\b`, "gi");
                  const parts = line.split(pattern);
                  return (
                    <div key={index}>
                      {parts.map((part, i) =>
                        boldWords.some((word) => word.toLowerCase() === part.toLowerCase()) ? (
                          <strong key={i} className="text-orange-600 font-semibold">
                            {part}
                          </strong>
                        ) : (
                          <span key={i}>{part}</span>
                        )
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="bg-gray-50 border border-gray-200 text-gray-800 p-4 rounded-xl whitespace-pre overflow-x-auto text-sm font-mono">
                {algo.code}
              </div>

              <div className="bg-orange-100 border border-orange-300 p-3 rounded-xl text-sm whitespace-pre text-orange-800">
                <strong>Testcase:</strong>
                {`\n${algo.testcase}`}
              </div>

              {algo.problems && algo.problems.length > 0 && (
                <div className="bg-white border border-orange-200 p-3 rounded-xl">
                  <strong className="text-orange-700">🔗 Practice Problems:</strong>
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    {algo.problems.map((p, i) => (
                      <li key={i}>
                        <a href={p.url} target="_blank" className="text-blue-600 underline">
                          {p.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DsaVisualizer;