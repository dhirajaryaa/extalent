import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        default: 0,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["Full Time", "Part Time", "Internship"],
        required: true,
    }
},{timestamps: true});
    
const jobModal = mongoose.model("Job", jobSchema);
export default jobModal;