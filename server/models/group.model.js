import mongoose from "mongoose";
import Auth from "./auth.model.js";

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    required: true
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Auth",
    required: true
  }
}, { timestamps: true });

export default mongoose.models.Group || mongoose.model("Group", groupSchema);
