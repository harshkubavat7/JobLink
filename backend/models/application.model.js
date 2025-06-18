import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
    job:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job', // Reference to the Job model
        required: true
    },
    applicant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    status:{
        type: String,
        enum: ['pending','accepted', 'rejected'], // Application status
        default: 'pending'
    }
},{ timestamps: true }); // Automatically manage createdAt and updatedAt fields
export const Application = mongoose.model("Application", applicationSchema);