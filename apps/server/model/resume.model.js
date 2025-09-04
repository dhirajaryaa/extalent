import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  publicId: {
    type: String,
    default: "",
  },
  url: {
    type: String,
    default: "",
  },
  thumbnailUrl: {
    type: String,
    default: "",
  },
  rowText: {
    type: String,
    default: "",
  },
  skills: [String],
  aiData: {
    type: Object,
    default: {},
  }, // structured info: education, experience
});

const resumeModal = mongoose.model("Resume", resumeSchema);
export default resumeModal;
