import { body, param, validationResult } from 'express-validator'
import mongoose from 'mongoose'
import { BadRequestError, NotFoundError } from '../Errors/customErrors.js'
import Job from '../models/JobModel.js'
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js'

const withValidationErrors = (validateValues)=>{
    return [validateValues, 
    (req, res, next)=>{
        const errors = validationResult(req)
        console.log(errors.isEmpty());
        if(!errors.isEmpty()){
            const errorMessages = errors.array().map((error)=> error.msg)
            // res.status(400).json({errors: errorMessages})
            if(errorMessages[0].startsWith('No job')){
                throw new NotFoundError(errorMessages);
            }
            throw new BadRequestError(errorMessages)
        }
        next()
    },
    ]
}

export const validateJobInput = withValidationErrors([
    body('company').notEmpty().withMessage('company is required'),
    body('position').notEmpty().withMessage('position is required'),
    body('jobLocation').notEmpty().withMessage('job location is required'),
    body('jobStatus').isIn(Object.values(JOB_STATUS)).withMessage('Invalid status value'),
    body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('Invalid type value'),
])

export const validateIdparam = withValidationErrors([
    param('id')
    .custom(async (value)=> {
        const isValidId = mongoose.Types.ObjectId.isValid(value);
        if(!isValidId) throw new Error('Invalid MongoDB id')
        const job = await Job.findById(value);
        if(!job) throw new NotFoundError(`No job with Id ${value}`)
    })
])