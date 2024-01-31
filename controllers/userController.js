import { StatusCodes } from "http-status-codes"
import userModel from "../models/userModel.js"
import jobModel from "../models/jobModel.js"
import { v2 as cloudinary } from "cloudinary"
import { promises as fs } from "fs"

export const getCurrentUser = async (req, res, next) => {
  const user = await userModel.findOne({ _id: req.user.userId })
  //Using instance method to remove password
  const userWithoutPassword = user.removePassword()
  res.status(StatusCodes.OK).json({ user: userWithoutPassword })
}

export const getApplicationStats = async (req, res, next) => {
  const users = await userModel.countDocuments()
  const jobs = await jobModel.countDocuments()

  res.status(StatusCodes.OK).json({ users, jobs })
}

export const updateUser = async (req, res, next) => {
  const newUser = { ...req.body }

  if (req.file) {
    const response = await cloudinary.uploader.upload(req.file.path)
    newUser.avatar = response.secure_url
    newUser.avatarPublicId = response.public_id
    await fs.unlink(req.file.path)
  }
  const updatedUser = await userModel.findByIdAndUpdate(
    req.user.userId,
    newUser
  )

  if (updatedUser.avatarPublicId && req.file) {
    await cloudinary.uploader.destroy(updatedUser.avatarPublicId)
  }
  res.status(StatusCodes.OK).json({ msg: "updated user" })
}
