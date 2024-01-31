import mongoose from "mongoose"

let userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: "lastName",
  },
  location: {
    type: String,
    default: "my city",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar: String,
  avatarPublicId: String,
})

userSchema.methods.removePassword = function () {
  const obj = this.toObject()
  delete obj.password
  return obj
}

export default mongoose.model("User", userSchema)
