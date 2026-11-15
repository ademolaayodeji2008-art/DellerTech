import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    status: { type: String, enum: ['new', 'read', 'replied'], default: 'new' },
    category: { type: String, enum: ['general', 'project', 'school'], default: 'general' },
    adminNote: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
