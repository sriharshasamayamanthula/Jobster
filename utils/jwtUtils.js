import jwt from "jsonwebtoken"

export function createJWT(payload) {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
  return token
}

export const verifyJWT = (token) => {
  let payload = jwt.verify(token, process.env.JWT_SECRET)
  return payload
}
