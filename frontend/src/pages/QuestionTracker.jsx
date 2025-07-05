import React, { useState, useEffect } from "react";

const initialDSAs = ["Array", "String", "Tree", "Graph", "Stack", "Queue"];

const QuestionTracker = () => {
  const [selectedDSA, setSelectedDSA] = useState("Array");
  const [questions, setQuestions] = useState({});
  const [newQuestion, setNewQuestion] = useState({ title: "", link: "", status: "Unsolved" });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleAddQuestion = () => {
    if (!newQuestion.title || !newQuestion.link) return;
    const updated = { ...(questions[selectedDSA] || []), [Date.now()]: newQuestion };
    setQuestions({ ...questions, [selectedDSA]: updated });
    setNewQuestion({ title: "", link: "", status: "Unsolved" });
  };

  const updateStatus = (ds, id, status) => {
    const updated = { ...questions[ds] };
    updated[id].status = status;
    setQuestions({ ...questions, [ds]: updated });
  };

  const deleteQuestion = (ds, id) => {
    const updated = { ...questions[ds] };
    delete updated[id];
    setQuestions({ ...questions, [ds]: updated });
  };

  return (
    <div className="min-h-screen w-full bg-white py-12 px-6 md:px-16 mt-[4%]">
      <h1 className="text-4xl  font-bold mb-10 text-center text-black">
        Your DSA <span className="text-orange-500">Question</span>Tracker
      </h1>

      {/* DSA Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {initialDSAs.map((dsa) => (
          <button
            key={dsa}
            onClick={() => setSelectedDSA(dsa)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition ${
              selectedDSA === dsa
                ? "bg-orange-500 text-white shadow"
                : "bg-gray-100 text-black hover:bg-gray-200"
            }`}
          >
            {dsa}
          </button>
        ))}
      </div>

      {/* Add Question Section */}
      <div className="bg-gray-50 p-6 rounded-2xl shadow-md max-w-5xl mx-auto mb-10">
        <h2 className="text-xl font-semibold mb-4">Add a Question in {selectedDSA}</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Question Title"
            value={newQuestion.title}
            onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
            className="flex-1 px-4 py-2 border rounded-md text-sm"
          />
          <input
            type="url"
            placeholder="Link to question"
            value={newQuestion.link}
            onChange={(e) => setNewQuestion({ ...newQuestion, link: e.target.value })}
            className="flex-1 px-4 py-2 border rounded-md text-sm"
          />
          <select
            value={newQuestion.status}
            onChange={(e) => setNewQuestion({ ...newQuestion, status: e.target.value })}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option>Unsolved</option>
            <option>Solving</option>
            <option>Solved</option>
          </select>
          <button
            onClick={handleAddQuestion}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
          >
            Add
          </button>
        </div>
      </div>

      {/* Question List Section */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">
          {selectedDSA} Questions ({Object.keys(questions[selectedDSA] || {}).length})
        </h2>

        <div className="space-y-4">
          {questions[selectedDSA] &&
            Object.entries(questions[selectedDSA]).map(([id, q]) => (
              <div
                key={id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white border rounded-xl shadow-sm"
              >
                <div className="flex flex-col">
                  <a
                    href={q.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 font-medium hover:underline text-base"
                  >
                    {q.title}
                  </a>
                  <span className="text-sm text-gray-500">Status: {q.status}</span>
                </div>
                <div className="flex items-center gap-3 mt-3 sm:mt-0">
                  <select
                    value={q.status}
                    onChange={(e) => updateStatus(selectedDSA, id, e.target.value)}
                    className="border px-2 py-1 rounded text-sm"
                  >
                    <option>Unsolved</option>
                    <option>Solving</option>
                    <option>Solved</option>
                  </select>
                  <button
                    onClick={() => deleteQuestion(selectedDSA, id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionTracker;
