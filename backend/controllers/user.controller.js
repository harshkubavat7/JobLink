import {User} from '../models/user.model.js'; //import the User model
import bcrypt from 'bcryptjs'; //import bcrypt for password hashing
import jwt from 'jsonwebtoken'; //import jsonwebtoken for token generation
import getDataUri from '../utils/datauri.js';
import cloudinary from '../utils/cloudinary.js';

export const register = async (req, res) => {
    try {
        const {fullname,email,phoneNumber,password,role} = req.body;//we will get the data from the request body
        if(!fullname || !email || !phoneNumber || !password || !role) { //check if all fields are provided
            //if any field is missing, return an error response
            return res.status(400).json({message: "All fields are required",success: false});
        }
        //cloudinary
        const file = req.file; // Get the uploaded file from the request
        const fileUri = getDataUri(file); // Convert the file to a data URI
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)


        const user = await User.findOne({email}); //check if the user already exists
        if(user){
            return res.status(400).json({message: "User already exists",success: false});
        }
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password,10);

        // Create a new user instance
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword, // Save the hashed password
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url, // Save the profile photo URL
            }
        })

        return res.status(201).json({message: "User registered successfully",success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error",success: false});
    }
}

export const login = async(req,res)=>{
    try {
        const {email,password,role}=req.body; //get the email and password from the request body
        if(!email || !password || !role) { //check if all fields are provided
            //if any field is missing, return an error response
            return res.status(400).json({message: "All fields are required",success: false});
        }
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: "Incorrect email or password",success: false});
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password); //compare the password with the hashed password
        if(!isPasswordMatch) {
            return res.status(400).json({message: "Incorrect email or password",success: false});
        }
        //check role 
        if(user.role !==role) {
            return res.status(400).json({message: "Account dosen't exist with current role",success: false});
        }

        const tokenData={
            id: user._id,
        }
        const token =  jwt.sign(tokenData,process.env.JWT_SECRET, {
            expiresIn: '3d' // Token will expire in 3 days
        });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie('token', token, {maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true,sameSite:'lax',secure:false}).json({
            message:`welcome back ${user.fullname}`,
            user,
            success: true,
        }) // Set the token in a cookie
    } catch (error) {
        console.log(error)
    }
}

export const logout = async (req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message: "Logged out successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = async(req,res)=>{
    try {
        // console.log("req.body:", req.body);
// console.log("req.file:", req.file);

        const {fullname,email,phoneNumber,bio,skills} = req.body; //get the data from the request body

        const file = req.file; // Get the uploaded file from the request
        // console.log(fullname, email, phoneNumber, bio, skills, file);


        // cloudinary will come
        const fileUri = getDataUri(file); // Convert the file to a data URI
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content,{
            resource_type: "raw",
            type: "upload", // public access
            public_id: `Resume`, // Use the current timestamp and original file name for uniqueness
        });


        //skills should be an array so we will convert it to an array
        let skillsArray;
        if(skills){
            skillsArray= skills.split(","); // Convert skills string to an array
        }

        

        const userId = req.id;// Get the user ID from the request (assuming you have middleware that sets req.id)
        let user = await User.findById(userId); // Find the user by ID
        if(!user) {
            return res.status(404).json({message: "User not found",success: false});
        }

        // Update the user profile
        if(fullname) user.fullname = fullname;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(bio) user.profile.bio = bio;
        if(skills) user.profile.skills = skillsArray; // Update skills array

        //resume is remaining
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url; // Update resume URL
            user.profile.resumeOriginalName = file.originalname //save the original file name
        }

        await user.save(); // Save the updated user to the database

        //
        user={
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true
        });

    } catch (error) {
        console.log(error)
    }
}