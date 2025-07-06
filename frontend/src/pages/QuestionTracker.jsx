import React, { useState, useEffect } from "react";
import QuestionSearchBox from "../components/QuestionSearchBox"; // Adjust path if needed

const initialDSAs = [
  "Array",
  "String",
  "Tree",
  "Graph",
  "Stack",
  "Queue",
  "Dynamic Programming",
  "Binary Search",
];

const QuestionTracker = () => {
  const [selectedDSA, setSelectedDSA] = useState("Array");
  const [questions, setQuestions] = useState({});
  const [noteEdit, setNoteEdit] = useState({ open: false, ds: null, id: null, value: "" });
  const [showSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleAddQuestion = (question) => {
    const updated = { ...(questions[selectedDSA] || []) };
    updated[Date.now()] = {
      title: question.title,
      link: question.url,
      status: "Unsolved",
      favorite: false,
      notes: "",
    };
      setShowSuccess(true); 
    setQuestions({ ...questions, [selectedDSA]: updated });
  };
   setTimeout(() => setShowSuccess(false), 1000);

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

  const toggleFavorite = (ds, id) => {
    const updated = { ...questions[ds] };
    updated[id].favorite = !updated[id].favorite;
    setQuestions({ ...questions, [ds]: updated });
  };

  const openNotes = (ds, id) => {
    setNoteEdit({
      open: true,
      ds,
      id,
      value: questions[ds][id].notes || "",
    });
  };

  const saveNotes = () => {
    const { ds, id, value } = noteEdit;
    const updated = { ...questions[ds] };
    updated[id].notes = value;
    setQuestions({ ...questions, [ds]: updated });
    setNoteEdit({ open: false, ds: null, id: null, value: "" });
  };

  return (
    <div className="min-h-screen w-full bg-white py-12 px-6 md:px-16 mt-[4%]">
      <h1 className="text-4xl font-bold mb-10 text-center text-black">
        Your DSA <span className="text-orange-500">Question</span> Tracker
      </h1>

      {/* DSA Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {initialDSAs.map((dsa) => (
          <button
            key={dsa}
            onClick={() => setSelectedDSA(dsa)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition ${selectedDSA === dsa
                ? "bg-orange-500 text-white shadow"
                : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
          >
            {dsa}
          </button>
        ))}
      </div>

      {/* Search Box */}
      <div className="bg-gray-50 p-6 rounded-2xl shadow-md max-w-5xl mx-auto mb-6">
        <h2 className="text-xl font-semibold mb-2">Search & Click to Add</h2>
        <QuestionSearchBox
          onSelect={(q) => handleAddQuestion(q)}
        />
        
        {showSuccess && (
  <div className="text-green-600 text-sm font-medium mb-2 transition-opacity duration-500">
    ✅ Question added successfully!
  </div>
)}
      </div>
        {/* console.log(message) */}

      {/* Questions List */}
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
                    className="text-orange-500 font-medium hover:underline text-base"
                  >
                    {q.title}
                  </a>
                  <span className="text-sm font-medium text-gray-500">Status:  <span
                    className={`text-sm font-medium ${q.status === "Solved"
                        ? "text-green-600"
                        : q.status === "Unsolved"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                  >
                    {q.status}
                  </span></span>
                
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

                  <span
                    className={`cursor-pointer text-xl ${q.favorite ? "text-yellow-500" : "text-gray-400"
                      }`}
                    onClick={() => toggleFavorite(selectedDSA, id)}
                  >
                    ★
                  </span>

                  <span
                    onClick={() => openNotes(selectedDSA, id)}
                    className="cursor-pointer text-lg"
                  >
                    📝
                  </span>

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

      {/* Notes Modal */}
      {noteEdit.open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg">
            <h2 className="text-lg font-bold mb-3">Add/Edit Notes</h2>
            <textarea
              value={noteEdit.value}
              onChange={(e) => setNoteEdit({ ...noteEdit, value: e.target.value })}
              rows={5}
              className="w-full border p-3 rounded-md text-sm"
              placeholder="Write your notes here..."
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setNoteEdit({ open: false, ds: null, id: null, value: "" })}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={saveNotes}
                className="bg-orange-500 px-4 py-2 rounded text-white hover:bg-orange-600 text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionTracker;
