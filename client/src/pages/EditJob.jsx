import { redirect, useLoaderData, useParams, Form } from "react-router-dom"
import customFetch from "../utils/customeFetch"
import { toast } from "react-toastify"
import Wrapper from "../assets/wrappers/DashboardFormPage"
import { FormRow, FormRowSelect, SubmitBtn } from "../components"
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants"

export const editJobLoader = async ({ params, request }) => {
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`)
    console.log(request.url)
    return data
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

export const editJobAction = async ({ params, request }) => {
  const formData = await request.formData()
  const Data = Object.fromEntries(formData)

  try {
    await customFetch.patch(`/jobs/${params.id}`, Data)
    toast.success("Job updated succesfully")
    return redirect("../all-jobs")
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return redirect("../all-jobs")
  }
}

export default function EditJob() {
  let { job } = useLoaderData()

  return (
    <Wrapper>
      <Form method="post">
        <h4 className="form-title">Edit Job</h4>
        <div className="form-center">
          <FormRow
            name="position"
            defaultValue={job.position}
            id="position"
            labelText="position"
          />
          <FormRow
            name="company"
            defaultValue={job.company}
            id="company"
            labelText="company"
          />
          <FormRow
            name="jobLocation"
            defaultValue={job.jobLocation}
            id="location"
            labelText="job location"
          />
          <FormRowSelect
            name="jobStatus"
            id="jobStatus"
            labelText="jobStatus"
            defaultValue={job.jobStatus}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            id="jobType"
            labelText="jobType"
            defaultValue={job.jobType}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  )
}
