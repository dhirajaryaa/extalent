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
  },
  {
    timestamps: true,
  }
);

// post create resume modal
userSchema.post("save", async function (doc, next) {
  try {
    await resumeModal.create({ userId: doc._id });
    next();
  } catch (err) {
    next(err);
  }
});

const userModal = mongoose.model("User", userSchema);
export default userModal;
