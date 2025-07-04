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

const DijkstraVisualizer = () => {
    const [edgeInput, setEdgeInput] = useState("0 1 1, 0 2 4, 1 2 2, 1 3 5, 2 3 1 , 3 4 1, 4 5 2 , 4 1 2 , 3 5 3");
    const [startNode, setStartNode] = useState("0");
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [started, setStarted] = useState(false);
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);
    const [layout, setLayout] = useState({});
    const [shortestPathEdges, setShortestPathEdges] = useState([]);
    const [totalans,settotalans]=useState(Infinity);
    // let totalans = Infinity;
    const parseEdges = () => {
        const edgeList = edgeInput.split(",").map((s) => s.trim().split(" "));
        const graph = {};
        const nodeSet = new Set();

        const edgeObjs = edgeList.map(([u, v, w]) => {
            if (!graph[u]) graph[u] = [];
            graph[u].push({ node: v, weight: parseInt(w) });
            nodeSet.add(u);
            nodeSet.add(v);
            return { from: u, to: v, weight: parseInt(w) };
        });

        return {
            graph,
            nodeIds: Array.from(nodeSet),
            edgeObjs,
        };
    };

    const findShortestPathEdges = (parentMap) => {
        const pathEdges = [];
        for (let node in parentMap) {
            const par = parentMap[node];
            if (par !== null) {
                pathEdges.push(`${par}-${node}`);
            }
        }
        return pathEdges;
    };


    const runDijkstra = (graph, nodeIds, start) => {
        const dist = {};
        const visited = new Set();
        const parent = {};
        const log = [];

        nodeIds.forEach((id) => {
            dist[id] = Infinity;
            parent[id] = null;
        });
        dist[start] = 0;

        while (visited.size < nodeIds.length) {
            let minNode = null;
            let minDist = Infinity;
            for (let id of nodeIds) {
                if (!visited.has(id) && dist[id] < minDist) {
                    minDist = dist[id];
                    minNode = id;
                }
            }

            if (!minNode) break;

            visited.add(minNode);
            log.push({ visiting: minNode, distances: { ...dist }, visited: new Set([...visited]) });

            for (let edge of graph[minNode] || []) {
                const newDist = dist[minNode] + edge.weight;
                if (newDist < dist[edge.node]) {
                    dist[edge.node] = newDist;
                    parent[edge.node] = minNode;
                    log.push({
                        updating: edge.node,
                        from: minNode,
                        newDistance: newDist,
                        distances: { ...dist },
                        visited: new Set([...visited]),
                    });
                } else if (newDist === dist[edge.node]) {
                    // Handle equal weight alternative parent
                    // Prefer lexicographically smaller parent for consistency
                    parent[edge.node] = minNode < parent[edge.node] ? minNode : parent[edge.node];
                }
            }
        }
        settotalans(dist[(nodeIds.length)-1]);
        return { log, finalDistances: dist, parent };
    };
    
    
    const handleStart = () => {
        const { graph, nodeIds, edgeObjs } = parseEdges();
        const { log, finalDistances, parent } = runDijkstra(graph, nodeIds, startNode);
        const layoutMap = generateCircularLayout(nodeIds);
        setSteps(log);
        setNodes(nodeIds);
        setEdges(edgeObjs);
        setLayout(layoutMap);
        setStarted(true);
        setCurrentStep(0);
        setShortestPathEdges(findShortestPathEdges(parent));
    };
    
    
    const nextStep = () => {
        if (currentStep < steps.length-1) {
            setCurrentStep((prev) => prev + 1);
        }
        // else{
        //     console.log("hi")
        // }
    };
    
    const reset = () => {
        setEdgeInput("0 1 1, 0 2 2, 1 2 2, 1 3 5, 2 3 1 , 3 4 1, 4 5 9 , 4 1 2 , 3 5 3");
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
        <Card className="shadow-xl border rounded-2xl mt-10 ">
            <CardContent className="pt-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">🧠 C++ Code</h3>
                <pre className="bg-gray-100 border border-gray-300 rounded-xl p-4 text-sm overflow-x-auto text-gray-800 font-mono mb-10">
                    {`void dijkstra(int start, vector<vector<pair<int, int>>>& graph, vector<int>& dist) {
  priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
  dist[start] = 0;
  pq.push({0, start});
  while (!pq.empty()) {
    int u = pq.top().second;
    int d = pq.top().first;
    pq.pop();
    if (d > dist[u]) continue;
    for (auto [v, w] : graph[u]) {
        if (dist[v] > d + w) {
            dist[v] = d + w;
            pq.push({dist[v], v});
            }
            }
            }
            }`}
                </pre>

                <div className="bg-orange-100 border border-orange-300 p-4 rounded-xl text-sm space-y-1 mb-10">
                    <div>📦 Time Complexity: <strong>O((V + E) log V)</strong></div>
                    <div>💾 Space Complexity: <strong>O(V + E)</strong></div>
                </div>

                <div className="bg-white border border-orange-200 p-4 rounded-xl text-sm">
                    <h4 className="text-orange-700 font-semibold mb-2">🔗 Practice Problems:</h4>
                    <ul className="list-disc ml-6 space-y-1 text-blue-600 underline">
                        <li><a href="https://leetcode.com/problems/network-delay-time/" target="_blank" rel="noreferrer">LeetCode - Network Delay Time</a></li>
                        <li><a href="https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/" target="_blank" rel="noreferrer">GFG - Dijkstra's Algorithm</a></li>
                        <li><a href="https://codeforces.com/problemset/problem/20/C" target="_blank" rel="noreferrer">Codeforces 20C - Dijkstra?</a></li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
    
    return (
        <div className="relative w-full mx-auto max-w-5xl px-4 py-8">
            <h2 className="text-4xl font-bold text-orange-600 text-center mb-6">Dijkstra Visualizer with Weights</h2>

            {!started && (
                <>
                    <div className="grid gap-4 md:grid-cols-2">
                        <input
                            type="text"
                            value={edgeInput}
                            onChange={(e) => setEdgeInput(e.target.value)}
                            placeholder="Edges (e.g. 0 1 1, 1 2 3)"
                            className="border border-gray-300 rounded-xl p-3"
                            />
                        <input
                            type="text"
                            value={startNode}
                            onChange={(e) => setStartNode(e.target.value)}
                            placeholder="Start Node"
                            className="border border-gray-300 rounded-xl p-3"
                            />
                        <button
                            onClick={handleStart}
                            className="bg-orange-500 hover:bg-orange-600 mb-10 mt-5 text-white py-3 px-4 rounded-xl col-span-2"
                            >
                            🎬 Start Visualization
                        </button>
                    </div>
                    {renderInfoSection()}
                </>
            )}

            {started && (
                <>
                    <CardContent className=" p-6 space-y-6 w-full border rounded-xl bg-white ">
                        {/* Edge Lines with Weights */}
                        <svg className="absolute top-12 left-20 w-full h-full z-0 pointer-events-none">
                            {edges.map((edge, idx) => {
                                const from = layout[edge.from];
                                const to = layout[edge.to];
                                if (!from || !to) return null;
                                const isCurrent = state?.from === edge.from && state?.updating === edge.to;
                                const pathId = `path-${idx}`;
                                const x1 = from.x + 25, y1 = from.y + 25;
                                const x2 = to.x + 25, y2 = to.y + 25;
                                return (
                                    <g key={idx}>
                                        <path
                                            id={pathId}
                                            d={`M ${x1} ${y1} L ${x2} ${y2}`}
                                            stroke={
                                                isCurrent 
                                                    ? "#f59e0b"
                                                    // : currentStep + 1 >= steps.length && shortestPathEdges.includes(`${edge.from}-${edge.to}`)
                                                        // ? "#10b981" // green
                                                        : "#888"
                                            }
                                            strokeWidth={
                                                isCurrent  ? 3 : 2
                                            }
                                            fill="none"
                                            markerEnd="url(#arrowhead)"
                                        />
                                        <text fontSize="12" fill="#111">
                                            <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
                                                {edge.weight}
                                            </textPath>
                                        </text>
                                    </g>
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
                            const isUpdating = state?.updating === id;
                            const dist = state?.distances?.[id];

                            return (
                                <div
                                    key={id}
                                    style={{
                                        position: "absolute",
                                        left: `${pos.x + 78}px`,
                                        top: `${pos.y + 50}px`,
                                        zIndex: 10,
                                    }}
                                    className={`w-12 h-12 flex flex-col items-center justify-center rounded-full font-semibold text-sm shadow-md
                    ${isVisiting ? "bg-orange-500 text-white" : isUpdating ? "bg-yellow-300 text-black" : isVisited ? "bg-green-500 text-white"  : (currentStep  === steps.length-2) ? "bg-red-500 animate-bounce" : "bg-gray-300 text-black"}`}
                                >
                                    {id}
                                    <span className="text-[10px]">
                                        ({dist === Infinity ? "∞" : dist})
                                    </span>
                                </div>
                            );
                        })}

                        {/* Step Info */}
                        <div className="z-20 relative text-center font-bold text-orange-700 mt-[45%]">
                            {state?.updating
                                ? `Updating distance of node ${state.updating} to ${state.newDistance} via ${state.from}`
                                : state?.visiting
                                    ? `Visiting node ${state.visiting}`
                                    : ""}
                                    <div className="text-green-700">
                                    {currentStep+1  >= steps.length ? `Total Path Sum is ${totalans} ` : ""}
                                    </div>
                        </div>

                        {/* Controls */}
                        <div className="z-20 relative flex justify-center gap-4 mt-5 mb-3">
                            <button
                                onClick={nextStep}
                                disabled={currentStep  >= steps.length}
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

export default DijkstraVisualizer;
