import { body, validationResult, param } from "express-validator"
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js"
import { JOB_TYPE, JOB_STATUS } from "../utils/constants.js"
import mongoose from "mongoose"
import jobModel from "../models/jobModel.js"
import userModel from "../models/userModel.js"

const withValidationErrors = (values) => {
  return [
    values,
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        let errorMessages = errors.array().map((error) => {
          return error.msg
        })
        if (errorMessages[0].startsWith("no job")) {
          throw new NotFoundError(errorMessages)
        }

        if (errorMessages[0].startsWith("Not authorised")) {
          throw new UnauthorizedError(errorMessages)
        }
        throw new BadRequestError(errorMessages)
      }
      next()
    },
  ]
}

export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").notEmpty().withMessage("jobLocation is required"),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("job Type is not supported"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("jobStatus is not supported"),
  body("position").notEmpty().withMessage("position is required"),
])

export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    //req object can be accessed by default in custom function
    const validId = mongoose.Types.ObjectId.isValid(value)
    if (!validId) {
      throw new BadRequestError("Invalid job Id")
    }

    //Validaton of job with Id there or not
    const job = await jobModel.findById(value)
    if (!job) {
      throw new NotFoundError(`no job with id ${value}`) // Directly caught by express validator rather than global midleware
    }

    //Verify if the job id is created by user or if Admin is accessing
    const isAdmin = req.user.role === "admin"
    const isOwner = job.createdBy == req.user.userId
    if (!isAdmin && !isOwner) {
      throw new UnauthorizedError("Not authorised to access the route") // Handled by express validator. In the authmidleware, user is authenticated. Then only, user can come to this middleware. So now it will be unauthorised
    }
  }),
])

export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const user = await userModel.findOne({ email })
      if (user) {
        throw new BadRequestError("user already exists with email")
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 5 })
    .withMessage("password should be atleast 5 chars"),
  body("location").notEmpty().withMessage("location is required"),
  body("lastName").notEmpty().withMessage("lastName is required"),
])

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid Email"),
  body("password").notEmpty().withMessage("password is required"),
])

export const validateUpdateUser = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email, { req }) => {
      const user = await userModel.findOne({ email })
      if (user && user._id.toString() != req.user.userId) {
        throw new BadRequestError("user already exists with email")
      }
    }),
  body("location").notEmpty().withMessage("location is required"),
  body("lastName").notEmpty().withMessage("lastName is required"),
])
