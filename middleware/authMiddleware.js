import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors.js"
import { verifyJWT } from "../utils/jwtUtils.js"

export const authenticateUser = (req, res, next) => {
  let { token } = req.cookies
  if (!token) {
    throw new UnauthenticatedError("Invalid credentials")
  }

  try {
    let { userId, role } = verifyJWT(token)
    const testUser = userId === "65b813222addcb074475ca35"
    req.user = { userId, role, testUser }
    next()
  } catch (err) {
    throw new UnauthenticatedError("Invalid credentials")
  }
}

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Not authorised to access the route")
    }
    next()
  }
}

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError("Demo User! Read Only")
  }
  next()
}
