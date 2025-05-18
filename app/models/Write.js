import mongoose from "mongoose";

const WriteSchema = new mongoose.Schema({
  work: { type: String, required: true },
  time: { type: Number, required: true },
  address: { type: String, required: true },
}, { timestamps: true });

const Write = mongoose.models.Write || mongoose.model("Write", WriteSchema);

export { Write };
