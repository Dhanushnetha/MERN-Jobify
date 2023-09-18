import { body, param, validationResult } from 'express-validator'
import mongoose from 'mongoose'
import { BadRequestError, NotFoundError, UnauthenticatedError } from '../Errors/customErrors.js'
import Job from '../models/JobModel.js'
import User from '../models/UserModel.js'
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

export const validateRegisterInput = withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format').custom(async(email)=>{
        const user = await User.findOne({email});
        if(user) throw new BadRequestError('Email already Exists');
    }),
    body('password').notEmpty().withMessage('Password is required').isLength({min: 8}).withMessage('password must be atleast 8 characters long'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('location').notEmpty().withMessage('Location name is required'),

])

export const validateLoginInput = withValidationErrors([
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format').custom(async(email)=>{
        // const user = await User.findOne({email});
        // if(!user) throw new UnauthenticatedError('Please register');
    }),
    body('password').notEmpty().withMessage('Password is required'),
])