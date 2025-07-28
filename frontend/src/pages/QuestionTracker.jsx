import React, { useState, useEffect } from "react";
import QuestionSearchBox from "../components/QuestionSearchBox";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/useAuthStore";
import { Navigate, useNavigate } from "react-router-dom";

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
  const { authUser } = useAuthStore();
  const navigate = useNavigate();
  const [selectedDSA, setSelectedDSA] = useState("Array");
  const [questions, setQuestions] = useState({});
  const [noteEdit, setNoteEdit] = useState({ open: false, ds: null, id: null, value: "" });
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authUser) {
      navigate("/login", { replace: true });
      return;
    }
  }, [authUser, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (authUser) {
      fetchQuestions();
    }
  }, [authUser]);

  // Early return if not authenticated
  if (!authUser) {
    return null; // or a loading spinner
  }

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      console.log("Fetching questions...");
      
      const response = await axiosInstance.get("/questions");
      console.log("Questions response:", response.data);
      
      // Group questions by category
      const groupedQuestions = {};
      response.data.forEach(question => {
        if (!groupedQuestions[question.category]) {
          groupedQuestions[question.category] = {};
        }
        groupedQuestions[question.category][question._id] = question;
      });
      
      console.log("Grouped questions:", groupedQuestions);
      setQuestions(groupedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      if (error.response?.status === 401) {
        toast.error("Please login to access your questions");
        navigate("/login");
      } else {
        toast.error("Failed to fetch questions");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddQuestion = async (question) => {
    try {
      console.log("Adding question:", question);
      
      const response = await axiosInstance.post("/questions", {
        title: question.title,
        link: question.url,
        category: selectedDSA,
      });

      console.log("Added question response:", response.data);
      
      const newQuestion = response.data;
      const updated = { ...(questions[selectedDSA] || {}) };
      updated[newQuestion._id] = newQuestion;
      
      setQuestions({ ...questions, [selectedDSA]: updated });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1000);
      toast.success("Question added successfully!");
    } catch (error) {
      console.error("Error adding question:", error);
      toast.error("Failed to add question");
    }
  };

  const updateStatus = async (ds, id, status) => {
    try {
      await axiosInstance.put(`/questions/${id}`, { status });
      
      const updated = { ...questions[ds] };
      updated[id].status = status;
      setQuestions({ ...questions, [ds]: updated });
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const deleteQuestion = async (ds, id) => {
    try {
      await axiosInstance.delete(`/questions/${id}`);
      
      const updated = { ...questions[ds] };
      delete updated[id];
      setQuestions({ ...questions, [ds]: updated });
      toast.success("Question deleted successfully!");
    } catch (error) {
      console.error("Error deleting question:", error);
      toast.error("Failed to delete question");
    }
  };

  const toggleFavorite = async (ds, id) => {
    try {
      const currentFavorite = questions[ds][id].favorite;
      await axiosInstance.put(`/questions/${id}`, { favorite: !currentFavorite });
      
      const updated = { ...questions[ds] };
      updated[id].favorite = !updated[id].favorite;
      setQuestions({ ...questions, [ds]: updated });
    } catch (error) {
      console.error("Error updating favorite:", error);
      toast.error("Failed to update favorite");
    }
  };

  const openNotes = (ds, id) => {
    setNoteEdit({
      open: true,
      ds,
      id,
      value: questions[ds][id].notes || "",
    });
  };

  const saveNotes = async () => {
    try {
      const { ds, id, value } = noteEdit;
      await axiosInstance.put(`/questions/${id}`, { notes: value });
      
      const updated = { ...questions[ds] };
      updated[id].notes = value;
      setQuestions({ ...questions, [ds]: updated });
      setNoteEdit({ open: false, ds: null, id: null, value: "" });
      toast.success("Notes saved successfully!");
    } catch (error) {
      console.error("Error saving notes:", error);
      toast.error("Failed to save notes");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading questions...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white py-12 px-6 md:px-16 mt-[4%] dark:bg-gray-900 dark:text-white transition-colors duration-500">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Your DSA <span className="text-orange-500">Question</span> Tracker
      </h1>

      {/* DSA Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {initialDSAs.map((dsa) => (
          <button
            key={dsa}
            onClick={() => setSelectedDSA(dsa)}
            className={`dark:bg-gray-900 dark:text-white duration-500 px-5 py-2 rounded-full text-sm font-medium dark:border transition ${
              selectedDSA === dsa
                ? "bg-orange-500 dark:bg-orange-500 dark:border-none"
                : "border border-black dark:border-white dark:hover-bg-gray-400"
            }`}
          >
            {dsa}
          </button>
        ))}
      </div>

      {/* Search Box */}
      <div className="bg-gray-50 p-6 rounded-2xl shadow-md max-w-5xl mx-auto mb-6 dark:bg-gray-900 transition-colors duration-500 dark:border">
        <h2 className="text-xl font-semibold mb-2">Search & Click to Add</h2>
        <QuestionSearchBox onSelect={(q) => handleAddQuestion(q)} />
        
        {showSuccess && (
          <div className="text-green-600 text-sm font-medium mb-2 transition-opacity duration-500">
            ✅ Question added successfully!
          </div>
        )}
      </div>

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
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white border rounded-xl shadow-sm dark:bg-gray-900 dark:text-white transition-colors duration-500"
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
                  <span className="text-sm font-medium text-gray-500">
                    Status:{" "}
                    <span
                      className={`text-sm font-medium ${
                        q.status === "Solved"
                          ? "text-green-600"
                          : q.status === "Unsolved"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {q.status}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-3 sm:mt-0">
                  <select
                    value={q.status}
                    onChange={(e) => updateStatus(selectedDSA, id, e.target.value)}
                    className="border px-2 py-1 rounded text-sm dark:bg-gray-900 dark:text-white transition-colors duration-500"
                  >
                    <option>Unsolved</option>
                    <option>Solving</option>
                    <option>Solved</option>
                  </select>

                  <span
                    className={`cursor-pointer text-xl ${
                      q.favorite ? "text-yellow-500" : "text-gray-400"
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
