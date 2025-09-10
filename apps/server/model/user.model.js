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

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
    },
    skills: [skillsSchema],
    resume: {
      type: mongoose.Types.ObjectId,
      ref: "Resume",
    },
    googleId: {
      type: String,
      required: true,
    },
    github: {
      type: mongoose.Types.ObjectId,
      ref: "Github",
    },
    jobs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Job",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const userModal = mongoose.model("User", userSchema);
export default userModal;
