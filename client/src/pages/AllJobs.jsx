import { toast } from "react-toastify"
import { JobsContainer, SearchContainer } from "../components"
import customFetch from "../utils/customeFetch"
import { useLoaderData } from "react-router-dom"
import { createContext, useContext } from "react"

export const allJobsLoader = async ({ params, request }) => {
  console.log("All Jobs Loader")
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ])
    let { data } = await customFetch.get("/jobs", { params })
    return { data, searchValues: { ...params } }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const AllJobsContext = createContext()

export default function AllJobs() {
  let { data, searchValues } = useLoaderData()
  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  )
}

//Custom hook
export const useAllJobsContext = () => {
  return useContext(AllJobsContext)
}
