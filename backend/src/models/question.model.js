import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Array", "String", "Tree", "Graph", "Stack", "Queue", "Dynamic Programming", "Binary Search"],
    },
    status: {
      type: String,
      enum: ["Unsolved", "Solving", "Solved"],
      default: "Unsolved",
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
export default Question;