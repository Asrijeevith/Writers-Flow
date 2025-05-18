import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true }, // "Enter your work"
  email: { type: String, required: true }, // "Enter number of pages"
  message: { type: String, required: true }, // "Enter your address"
}, { timestamps: true }); // Automatically add createdAt and updatedAt

const Contact = mongoose.models.Contact || mongoose.model("Contact", ContactSchema);

export { Contact };