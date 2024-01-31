import customFetch from "../utils/customeFetch"
import { StatsContainer, ChartsContainer } from "../components"
import { useLoaderData } from "react-router-dom"

export const statsLoader = async () => {
  console.log("Stats Loader")
  try {
    const response = await customFetch.get("/jobs/stats")
    return response.data
  } catch (error) {
    return error
  }
}

export default function Stats() {
  const { defaultStats, monthlyApplications } = useLoaderData()
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 0 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  )
}
