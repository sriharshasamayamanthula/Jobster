import bcrypt from "bcryptjs"

export async function hashPassword(password) {
  let salt = await bcrypt.genSalt(10)
  let hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}

export async function comparePassword(password, hashedPassword) {
  const isMatch = await bcrypt.compare(password, hashedPassword)
  return isMatch
}
