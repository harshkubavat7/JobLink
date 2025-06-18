import mongoose, { mongo } from "mongoose";

const companySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true // Ensure company names are unique
    },
    description:{
        type: String,
        
    },
    website:{
        type: String,
    },
    location:{
        type: String,
        
    },
    logo:{
        type: String, // URL or path to the logo file
        default: ""
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,//what is use : it is used to create a reference to another document in MongoDB
        ref: 'User', // Reference to the User model
        required: true
    }
},{timestamps: true}); // Automatically manage createdAt and updatedAt fields
export const Company = mongoose.model("Company", companySchema);