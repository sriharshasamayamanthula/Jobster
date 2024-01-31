import { redirect } from "react-router-dom"
import { toast } from "react-toastify"
import customFetch from "../utils/customeFetch"

export const deleteJobAction = async ({ params }) => {
  try {
    await customFetch.delete(`/jobs/${params.id}`)
    toast.success("Job deleted succesfully")
  } catch (error) {
    toast.error(error?.response?.data?.msg)
  }
  return redirect("../all-jobs")
}

