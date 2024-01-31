import mongoose from "mongoose"
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js"

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
    },
    position: {
      type: String,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: "full-time",
    },
    jobLocation: {
      type: String,
      default: "my city",
    },
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
)

export default mongoose.model("Job", JobSchema)
