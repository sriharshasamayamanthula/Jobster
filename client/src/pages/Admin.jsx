import { toast } from "react-toastify"
import customFetch from "../utils/customeFetch"
import Wrapper from "../assets/wrappers/StatsContainer"
import { redirect, useLoaderData } from "react-router-dom"
import { StatItem } from "../components"
import { FaSuitcaseRolling, FaCalendarCheck } from "react-icons/fa"

export const adminLoader = async () => {
  try {
    const { data } = await customFetch.get("/users/app-stats")
    return data
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return redirect("../")
  }
}

const Admin = () => {
  const { users, jobs } = useLoaderData()

  return (
    <Wrapper>
      <StatItem
        title="current users"
        count={users}
        color="#e9b949"
        bcg="#fcefc7"
        icon={<FaSuitcaseRolling />}
      />
      <StatItem
        title="total jobs"
        count={jobs}
        color="#647acb"
        bcg="#e0e8f9"
        icon={<FaCalendarCheck />}
      />
    </Wrapper>
  )
}
export default Admin
