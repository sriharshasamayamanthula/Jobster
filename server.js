import express from "express"
import morgan from "morgan"
import mongoose from "mongoose"
import cloudinary from "cloudinary"
import "express-async-errors"
import cookieParser from "cookie-parser"
import * as dotenv from "dotenv"
dotenv.config()
const app = express()
const port = process.env.PORT || 5100

//Custom imports
import jobRouter from "./routes/jobRouter.js"
import authRouter from "./routes/authRouter.js"
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js"
import { authenticateUser } from "./middleware/authMiddleware.js"
import userRouter from "./routes/userRouter.js"

//Public
import path, { dirname } from "path"
import { fileURLToPath } from "url"
//__dirname is not presnt in type:module. Only present in commonjs. So we have to get the directory path manually
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname, "./public")))

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}
app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/jobs", authenticateUser, jobRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", authenticateUser, userRouter)

//Route to display index.html page from server port
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"))
})

//Not found route
app.use("*", (req, res) => {
  res.status(404).json({ msg: "Route not found" })
})

//Error handling middleware
app.use(errorHandlerMiddleware)

try {
  await mongoose.connect(process.env.MONGO_URL)
  app.listen(port, () => {
    console.log(`server running on port ${process.env.PORT}`)
  })
} catch (err) {
  console.log(err)
  process.exit(1)
}
