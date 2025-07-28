import Question from "../models/question.model.js";

export const getQuestions = async (req, res) => {
  try {
    console.log("Getting questions for user:", req.user._id);
    const questions = await Question.find({ userId: req.user._id });
    console.log("Found questions:", questions.length);
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Failed to fetch questions" });
  }
};

export const addQuestion = async (req, res) => {
  try {
    console.log("Adding question for user:", req.user._id);
    console.log("Request body:", req.body);
    
    const { title, link, category } = req.body;
    
    if (!title || !link || !category) {
      return res.status(400).json({ message: "Title, link, and category are required" });
    }
    
    const newQuestion = new Question({
      userId: req.user._id,
      title,
      link,
      category,
    });

    const savedQuestion = await newQuestion.save();
    console.log("Question saved:", savedQuestion);
    
    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ message: "Failed to add question" });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    console.log("Updating question:", id, "for user:", req.user._id);
    console.log("Updates:", updates);

    const question = await Question.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      updates,
      { new: true }
    );

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    console.log("Question updated:", question);
    res.status(200).json(question);
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ message: "Failed to update question" });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Deleting question:", id, "for user:", req.user._id);

    const question = await Question.findOneAndDelete({
      _id: id,
      userId: req.user._id,
    });

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    console.log("Question deleted:", question);
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ message: "Failed to delete question" });
  }
};
