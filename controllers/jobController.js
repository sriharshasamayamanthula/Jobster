import jobModel from "../models/jobModel.js"
import { StatusCodes } from "http-status-codes"
import { NotFoundError } from "../errors/customErrors.js"
import mongoose from "mongoose"
import day from "dayjs"

export const getAllJobs = async (req, res) => {
  // We need to filter based on query params also
  const { search, jobStatus, jobType, sort } = req.query

  let queryObject = { createdBy: req.user.userId }

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ]
  }

  //jobStatus and jobType filtering. If they are 'all', then no need to filter them.
  if (jobStatus && jobStatus != "all") {
    queryObject.jobStatus = jobStatus
  }
  if (jobType && jobType != "all") {
    queryObject.jobType = jobType
  }

  //sort options
  const sortOptions = {
    newest: "-createdAt",
    oldest: "createdAt",
    "a-z": "position",
    "z-a": "-position",
  }

  const sortKey = sortOptions[sort] || sortOptions.newest //If no sort is given, we sort it based on new jobs

  //setup pagination

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  const jobs = await jobModel
    .find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limit)

  const totalJobs = await jobModel.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalJobs / limit)

  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs })
}

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  let job = await jobModel.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

export const getJob = async (req, res) => {
  const { id } = req.params
  const job = await jobModel.findById(id)

  //Job is there or not is validated in validation middleware

  // if (!job) {
  //   throw new NotFoundError(`no job with id ${id}`)
  // }
  res.status(StatusCodes.OK).json({ job })
}

export const updateJob = async (req, res) => {
  // const { company, position } = req.body
  // if (!company || !position) {
  //   return res.status(400).json({ msg: "please provide company and position" })
  // }
  const { id } = req.params
  const updatedJob = await jobModel.findByIdAndUpdate(id, req.body, {
    new: true,
  })

  //Job is there or not is validated in validation middleware

  // if (!updatedJob) {
  //   throw new NotFoundError(`no job with id ${id}`)
  // }
  res.status(StatusCodes.OK).json({ msg: "job modified", job: updatedJob })
}

export const deleteJob = async (req, res) => {
  const { id } = req.params
  const job = await jobModel.findByIdAndDelete(id)

  //Job is there or not is validated in validation middleware
  // if (!job) {
  //   throw new NotFoundError(`no job with id ${id}`)
  // }
  res.status(StatusCodes.OK).json({ msg: "job deleted", job })
}

export const showStats = async (req, res) => {
  //Aggregate based on job status
  let stats = await jobModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    {
      $group: {
        _id: "$jobStatus",
        count: { $sum: 1 },
      },
    },
  ])

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count
    return acc
  }, {})

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  }

  //Aggregate total no of applications based on month and year

  let monthlyApplications = await jobModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.userId),
      },
    },
    //Grouping
    {
      $group: {
        _id: {
          year: {
            $year: "$createdAt",
          },
          month: {
            $month: "$createdAt",
          },
        },
        count: {
          $sum: 1,
        },
      },
    },
    //Sorting recent first
    {
      $sort: {
        "_id.year": -1,
        "_id.month": -1,
      },
    },
    {
      $limit: 6,
    },
  ])

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY")

      return { date, count }
    })
    .reverse()

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })
}
