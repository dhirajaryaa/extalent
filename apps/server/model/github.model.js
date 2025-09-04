import mongoose from "mongoose";

const repos = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    description: { type: String, default: "" },
    html_url: { type: String, default: "" },
    recentActivity: { type: Date, default: Date.now },
    size: { type: Number, default: 0 },
    languages: { type: String, default: "" },
    topics: [{ type: String, default: "" }],
    score: { type: Number, default: 0 },
    defaultBranch: { type: String, default: "" },
    stars: { type: Number, default: 0 },
    lastSynced: { type: Date, default: Date.now },
  },
  { _id: false }
);

const githubSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name:{
    type: String,
    default: "",
  },
  readme:{
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
  },
  location:{
    type: String,
    default: "",
  },
  blog: { type: String, default: "" },
  publicRepoCount: {
    type: Number,
    default: 0,
  },
  username: {
    type: String,
    default: "",
  },
  languages: [
    {
      name: String,
      repos: Number,
      score: Number,
    },
  ],
  lastSynced: {
    type: Date,
    default: Date.now,
  },
  topRepos: [repos],
  userWorkTopics: [{ type: String, default: "" }],
});

const githubModal = mongoose.model("Github", githubSchema);
export default githubModal;
