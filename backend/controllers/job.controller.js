import {Job} from "../models/job.model.js"

// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),//convert salary to number
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

//all jobs will be display

export const getAllJobs = async(req,res)=>{
    try {
        const keyword = req.query.keyword || "";//we will get this keyword from url 
        const query={
            $or :[
                {title:{$regex:keyword, $options:"i"}}, // i means case insensitive
                {description:{$regex:keyword, $options:"i"}},
            ]
        };
        const jobs = await Job.find(query).populate({ //v.imp for interviews
            path:"company"
        }).sort({ createdAt: -1 }); // -1 means descending order
        //populate will replace the company id with company details
        if(!jobs){
            return res.status(404).json({
                message: "No jobs found.",
                success: false
            });
        }
        return res.status(200).json({
            message: "All jobs fetched successfully.",
            jobs,
            success: true
        });
    } catch (error) {
        console.log(error)
    }
}
//for studnts
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
             path:"company"
        }); // -1 means descending order
        //populate will replace the company id with company details
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}

// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: "company"
        })
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}