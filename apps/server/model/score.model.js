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
  totalScore: {
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
    savedJobId: {
      type: mongoose.Types.ObjectId,
      ref: "Job",
    },
    jobSaved: {
      type: Boolean,
      default: false,
    },
    linkedinJobId: {
      type: String,
      required: true,
    },
    score: score,
    matchSkills: [skillsSchema],
    messingSkills: [skillsSchema],
    suggestedJobs: [
      {
        type: String,
      },
    ],
    improvementSkills: [improvementSkill],
    suggestions: [String],
  },
  {
    timestamps: true,
  }
);

const scoreModel = mongoose.model("Score", scoreSchema);
export default scoreModel;
