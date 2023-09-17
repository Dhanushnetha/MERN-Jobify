import Job from '../models/JobModel.js';
import {nanoid} from 'nanoid'

let jobs = [
    { id: nanoid(), company: 'apple', position: 'front-end' },
    { id: nanoid(), company: 'google', position: 'back-end' },
];

export const getAllJobs = async (req, res) => {
    // console.log(jobss)
    res.status(200).json({ jobs });
}

export const createJob = async (req, res) => {
    const job = await Job.create(dwe)
    res.status(200).json({ job });
} 

export const getJob = async (req, res) => {
    const {id} =  req.params;
    const job = jobs.find((job)=>job.id === id);
    if(!job){
        throw new Error('no job with thattt Id');
       return res.status(400).json({msg: `No job found with id ${id}`});
    }
    res.status(200).json({ job });
}

export const updatejob = async (req, res) => {
    const {company, position} =  req.body;
    if(!company || !position){
       return res.status(400).json({msg: 'please provide company and position'});
    }
    const {id} =  req.params;
    const job = jobs.find((job)=> job.id === id);
    if(!job){
        return res.status(400).json({msg: `No job with Id ${id}`});
    }
    job.company = company;
    job.position = position;
    res.status(200).json({ msg: 'job modified', job });
}

export const deleteJob = (req, res) => {
    const {id} =  req.params;
    const job = jobs.find((job)=>job.id === id);
    if(!job){
       return res.status(400).json({msg: `No job found with id ${id}`});
    }
    const newJobs = jobs.filter(job=> job.id !== id);
    jobs = newJobs;
    //jobs.pop(job)
    res.status(200).json({ newJobs });
}