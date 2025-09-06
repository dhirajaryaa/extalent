import mongoose from "mongoose";

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
