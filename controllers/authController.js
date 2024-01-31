import { StatusCodes } from "http-status-codes"
import userModel from "../models/userModel.js"
import { hashPassword, comparePassword } from "../utils/passwordUtils.js"
import { UnauthenticatedError } from "../errors/customErrors.js"
import { createJWT } from "../utils/jwtUtils.js"

export const register = async (req, res) => {
  //First user will be the admin

  const isAdmin = (await userModel.countDocuments()) === 0
  req.body.role = isAdmin ? "admin" : "user"

  const hashedPassword = await hashPassword(req.body.password)
  req.body.password = hashedPassword
  const user = await userModel.create(req.body)
  res.status(StatusCodes.CREATED).json({ user })
}

export const login = async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email })
  const isPasswordCorrect =
    user && (await comparePassword(req.body.password, user.password))
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials")
  }

  let token = createJWT({ userId: user._id, role: user.role })
  // res.status(StatusCodes.OK).json({ msg: "Login succesful", token })

  //send token as cookie
  const oneDay = 1000 * 60 * 60 * 24

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + oneDay),
  })
  res.status(StatusCodes.OK).json({ msg: "login succesful" })
}

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.status(StatusCodes.OK).json({ msg: "user succesfully loggedout" })
}
