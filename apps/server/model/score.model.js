import mongoose from "mongoose";

const skillsSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { _id: false }
);

const improvementSkill = new mongoose.Schema(
  {
    skills: [skillsSchema],
    priority: {
      type: String,
      enum: ["high", "medium", "low", "critical"],
      required: true,
    },
    improvement: {
      type: String,
    },
  },
  { _id: false }
);

const score = new mongoose.Schema({
  jobFitScore: {
    type: Number,
    default: 0,
    required: true,
  },
  relevanceScore: {
    type: Number,
    default: 0,
    required: true,
  },
  skillsScore: {
    type: Number,
    default: 0,
    required: true,
  },
  overAllScore: {
    type: Number,
    default: 0,
    required: true,
  },
});

const scoreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    JobId: {
      type: mongoose.Types.ObjectId,
      ref: "Job",
      required: true
    },
    score: score,
    matchSkills: [skillsSchema],
    messingSkills: [skillsSchema],
    improvementSkills: [improvementSkill],
    suggestions: [String],
  },
  {
    timestamps: true,
  }
);

const scoreModel = mongoose.model("Score", scoreSchema);
export default scoreModel;
