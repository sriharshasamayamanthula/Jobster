import { StatusCodes } from "http-status-codes"

export default function errorHandlerMiddleware(err, req, res, next) {
  let msg = err.message || "something went wrong, try again later"
  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  res.status(statusCode).json({ msg })
}
