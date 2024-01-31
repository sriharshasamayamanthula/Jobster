import mongoose, { mongo } from "mongoose"
import jobModel from "./models/jobModel.js"
import userModel from "./models/userModel.js"
import { readFile } from "fs/promises"
import dotenv from "dotenv"
dotenv.config()

try {
  await mongoose.connect(process.env.MONGO_URL)
  const user = await userModel.findOne({ email: "test@test.com" })
  let jsonJobs = JSON.parse(
    await readFile(new URL("./utils/mockData.json", import.meta.url))
  )
  let jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id }
  })
  await jobModel.deleteMany({ lastName: "lastName" })
  await jobModel.create(jobs)
  console.log("Success!!!")
  process.exit(0)
} catch (error) {
  console.log(error)
  process.exit(1)
}
