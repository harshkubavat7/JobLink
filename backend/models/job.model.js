import { application } from "express";
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    requirements:[{
        type: String
    }],
    salary:{
        type: Number,
        required:true
    },
    experienceLevel:{
        type:Number,
        required:true // Experience level in years
    },
    location:{
        type: String,
        required: true
    },
    jobType:{
        type: String,
        //enum: ['full-time', 'part-time', 'internship', 'contract'], // Job types
        required: true
    },
    position:{
        type: String,
        required: true
    },
    company:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company', // Reference to the Company model
        required: true
    },
    created_by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    applications:[{ //use to store information of student who apply to this job
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application' // Reference to the Application model
    }]
},{ timestamps: true }); // Automatically manage createdAt and updatedAt fields
export const Job=mongoose.model("Job", jobSchema);