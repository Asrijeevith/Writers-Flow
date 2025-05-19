import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    work: { type: String, required: true },
    deadline: { type: Date, required: true },
    pages: { type: Number, required: true },
    address: { type: String, required: true },
    phonenumber: { type: Number, required: true },
    matchedWriter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Write", // Reference to the Write model
      default: null,
    },
  },
  { timestamps: true }
);

const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);

export { Task };
