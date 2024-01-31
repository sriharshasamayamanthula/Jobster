import { Form, redirect, useOutletContext } from "react-router-dom"
import Wrapper from "../assets/wrappers/DashboardFormPage"
import { FormRow, FormRowSelect, SubmitBtn } from "../components"
import { JOB_STATUS, JOB_TYPE } from "../../../utils/constants"
import customFetch from "../utils/customeFetch"
import { toast } from "react-toastify"

export const addJobAction = async ({ request }) => {
  console.log("add job action")
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    await customFetch.post("/jobs", data)
    toast.success("Job added successfully")
    return redirect("all-jobs")
  } catch (error) {
    console.log(error)
    toast.error(error?.response?.data?.msg)
    return error
  }
}

export default function AddJob() {
  const { user } = useOutletContext()
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">Add Job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" />
          <FormRow type="text" name="company" />
          <FormRow type="text" name="jobLocation" />
          <FormRowSelect
            name="jobStatus"
            labelText="job Status"
            defaultValue={JOB_STATUS.PENDING}
            list={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelText="job Type"
            defaultValue={JOB_TYPE.FULL_TIME}
            list={Object.values(JOB_TYPE)}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  )
}
