import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    publicId: {
      type: String,
      default: ""
    },
    url: {
      type: String,
      default: ""
    },
    thumbnailUrl: {
      type: String,
      default: "",
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
    resume: resumeSchema,
    googleId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userModal = mongoose.model("User", userSchema);
export default userModal;
