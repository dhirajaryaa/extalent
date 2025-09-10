import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    linkedinJobId: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    fitScore: {
      type: mongoose.Types.ObjectId,
      ref: "Score",
      required: true,
    },
    jobSaved: {
      type: Boolean,
      default: false,
    },
    jobType: {
      type: String,
      enum: ["Full Time", "Part Time", "Internship"],
      required: true,
    },
  },
  { timestamps: true }
);

const jobModal = mongoose.model("Job", jobSchema);
export default jobModal;
