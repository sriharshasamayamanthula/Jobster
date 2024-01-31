import { StatusCodes } from "http-status-codes"

export class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.NOT_FOUND
    this.name = "NotFoundError"
  }
}

export class BadRequestError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.BAD_REQUEST
    this.name = "BadRequestError"
  }
}

export class UnauthenticatedError extends Error {
  constructor(message) {
    super(message)
    this.name = "UnauthenticatedError"
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}
export class UnauthorizedError extends Error {
  constructor(message) {
    super(message)
    this.name = "UnauthorizedError"
    this.statusCode = StatusCodes.FORBIDDEN
  }
}
