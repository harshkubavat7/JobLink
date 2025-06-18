import { Company } from "../models/company.model.js";
import getDataUri from '../utils/datauri.js';
import cloudinary from '../utils/cloudinary.js';


export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register same company.",
                success: false
            })
        };
        company = await Company.create({
            name: companyName,
            userId: req.id //userId: req.id associates the company with the user who created it.
            //This means req.id is probably set in an authentication middleware (like isAuthenticated).
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
}

export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // logged in user id
        const companies = await Company.find({ userId }); //Uses Mongoose to query the database for all Company documents where userId matches the logged-in user.
        //This will return an array of companies created by that user.
        
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;//Gets the company ID from the route parameters.
        //Example route: GET /api/company/:id — :id becomes req.params.id.
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
 
        const file = req.file;
        // // idhar cloudinary ayega
        // const fileUri = getDataUri(file); // Convert the file to a data URI

        if (file) {
            const fileUri = getDataUri(file);
            if (!fileUri) {
            return res.status(400).json({
            message: "File could not be processed.",
             success: false,
    });
  }

        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
        const logo = cloudResponse.secure_url; // Get the secure URL of the uploaded file

    
        const updateData = { name, description, website, location ,logo};

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            message:"Company information updated.",
            success:true
        })
    }

    } catch (error) {
        console.log(error);
    }
}