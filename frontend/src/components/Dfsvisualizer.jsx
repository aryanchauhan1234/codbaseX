import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";

const generateCircularLayout = (nodes, containerWidth = 700, containerHeight = 400) => {
  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;
  const radius = Math.min(centerX, centerY) - 60;
  const angleStep = (2 * Math.PI) / nodes.length;
  const layout = {};
  nodes.forEach((id, idx) => {
    layout[id] = {
      x: centerX + radius * Math.cos(angleStep * idx),
      y: centerY + radius * Math.sin(angleStep * idx),
    };
  });
  return layout;
};

const DFSVisualizer = () => {
  const [graphInput, setGraphInput] = useState("0:1,2; 1:3; 2:3,4; 3:; 4:");
  const [startNode, setStartNode] = useState("0");
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [layout, setLayout] = useState({});

  const parseGraph = () => {
    const graph = {};
    const edgeList = [];
    const nodeSet = new Set();

    graphInput.split(";").forEach((entry) => {
      const [node, neighbors] = entry.split(":");
      if (node) {
        const trimmedNode = node.trim();
        nodeSet.add(trimmedNode);
        const neighborsList = neighbors ? neighbors.split(",").map((n) => n.trim()) : [];
        graph[trimmedNode] = neighborsList;
        neighborsList.forEach((neighbor) => {
          edgeList.push({ from: trimmedNode, to: neighbor });
          nodeSet.add(neighbor);
        });
      }
    });

    return {
      graph,
      edgeList,
      nodeIds: Array.from(nodeSet),
    };
  };

  const dfsSteps = (graph, start) => {
    const visited = new Set();
    const result = [];

    const dfs = (node) => {
      if (visited.has(node)) return;
      visited.add(node);
      result.push({ visiting: node, visited: new Set([...visited]) });
      for (let neighbor of graph[node] || []) {
        dfs(neighbor);
      }
    };

    dfs(start);
    return result;
  };

  const handleStart = () => {
    const { graph, nodeIds, edgeList } = parseGraph();
    if (!graph[startNode]) return alert("Invalid start node.");

    const logs = dfsSteps(graph, startNode);
    const layoutMap = generateCircularLayout(nodeIds);

    setSteps(logs);
    setNodes(nodeIds);
    setEdges(edgeList);
    setLayout(layoutMap);
    setStarted(true);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep + 1 < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const reset = () => {
    setGraphInput("0:1,2; 1:3; 2:3,4; 3:; 4:");
    setStartNode("0");
    setSteps([]);
    setNodes([]);
    setEdges([]);
    setLayout({});
    setStarted(false);
    setCurrentStep(0);
  };

  const state = steps[currentStep];

  const renderInfoSection = () => (
    <Card className="shadow-xl border rounded-2xl mt-10">
      <CardContent className="pt-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">🧠 C++ Code</h3>
        <pre className="bg-gray-100 border border-gray-300 rounded-xl p-4 text-sm overflow-x-auto text-gray-800 font-mono mb-10">
{`void DFS(int node, vector<vector<int>>& graph, vector<bool>& visited) {
  visited[node] = true;
  for (int neighbor : graph[node]) {
    if (!visited[neighbor]) {
      DFS(neighbor, graph, visited);
    }
  }
}`}
        </pre>

        <div className="bg-orange-100 border border-orange-300 p-4 rounded-xl text-sm space-y-1 mb-10">
          <div>📦 Time Complexity: <strong>O(V + E)</strong></div>
          <div>💾 Space Complexity: <strong>O(V)</strong></div>
        </div>

        <div className="bg-white border border-orange-200 p-4 rounded-xl text-sm">
          <h4 className="text-orange-700 font-semibold mb-2">🔗 Practice Problems:</h4>
          <ul className="list-disc ml-6 space-y-1 text-blue-600 underline">
            <li><a href="https://leetcode.com/problems/number-of-islands/" target="_blank" rel="noreferrer">LeetCode - Number of Islands</a></li>
            <li><a href="https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/" target="_blank" rel="noreferrer">GFG - DFS for Graph</a></li>
            <li><a href="https://codeforces.com/problemset/problem/339/D" target="_blank" rel="noreferrer">Codeforces - DFS Tree</a></li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="relative w-full mx-auto max-w-5xl px-4 py-8">
      <h2 className="text-4xl font-bold text-orange-600 text-center mb-6">DFS Visualizer (Graph)</h2>

      {!started && (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              value={graphInput}
              onChange={(e) => setGraphInput(e.target.value)}
              placeholder="Graph (e.g. 0:1,2; 1:3)"
              className="border border-gray-300 rounded-xl p-3"
            />
            <input
              type="text"
              value={startNode}
              onChange={(e) => setStartNode(e.target.value)}
              placeholder="Start Node (e.g. 0)"
              className="border border-gray-300 rounded-xl p-3"
            />
            <button
              onClick={handleStart}
              className="bg-orange-500 hover:bg-orange-600 mb-10 mt-5 text-white py-3 px-4 rounded-xl col-span-2"
            >
              🎬 Start DFS
            </button>
          </div>
          {renderInfoSection()}
        </>
      )}

      {started && (
        <>
          <CardContent className="p-6 space-y-6 w-full border rounded-xl bg-white relative">
            {/* SVG edges */}
            <svg className="absolute top-12 left-20 w-full h-full z-0 pointer-events-none">
              {edges.map((edge, idx) => {
                const from = layout[edge.from];
                const to = layout[edge.to];
                if (!from || !to) return null;

                return (
                  <line
                    key={idx}
                    x1={from.x + 25}
                    y1={from.y + 25}
                    x2={to.x + 25}
                    y2={to.y + 25}
                    stroke="#aaa"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                );
              })}
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="10"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill="#444" />
                </marker>
              </defs>
            </svg>

            {/* Nodes */}
            {nodes.map((id) => {
              const pos = layout[id];
              if (!pos) return null;
              const isVisiting = state?.visiting === id;
              const isVisited = state?.visited?.has(id);

              return (
                <div
                  key={id}
                  style={{
                    position: "absolute",
                    left: `${pos.x + 80}px`,
                    top: `${pos.y + 50}px`,
                    zIndex: 10,
                  }}
                  className={`w-12 h-12 flex items-center justify-center rounded-full font-semibold text-sm shadow-md
                    ${isVisiting ? "bg-red-500 text-white animate-pulse" : isVisited ? "bg-green-500 text-white" : "bg-gray-300 text-black"}`}
                >
                  {id}
                </div>
              );
            })}

            <div className="z-20 relative text-center font-bold text-orange-700 mt-[45%]">
              {state?.visiting ? `Visiting node ${state.visiting}` : ""}
            </div>

            <div className="z-20 relative flex justify-center gap-4 mt-5 mb-3">
              <button
                onClick={nextStep}
                disabled={currentStep + 1 >= steps.length}
                className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-2xl disabled:opacity-50"
              >
                ⏭️ Next Step
              </button>
              <button
                onClick={reset}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-6 rounded-2xl"
              >
                🔄 Reset
              </button>
            </div>
          </CardContent>

          {renderInfoSection()}
        </>
      )}
    </div>
  );
};

export default DFSVisualizer;
