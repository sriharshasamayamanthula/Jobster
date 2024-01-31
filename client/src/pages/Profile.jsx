import { Form, useOutletContext } from "react-router-dom"
import Wrapper from "../assets/wrappers/DashboardFormPage"
import { FormRow, SubmitBtn } from "../components"
import { toast } from "react-toastify"
import customFetch from "../utils/customeFetch"

export const profileAction = async ({ request }) => {
  const formData = await request.formData()

  const file = formData.get("avatar")
  if (file && file.size > 500000) {
    toast.error("File size is too big")
    return null
  }

  try {
    await customFetch.patch("/users/update-user", formData)
    toast.success("profile updated succesfully")
    return null
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return null
  }
}

export default function Profile() {
  const { user } = useOutletContext()
  const { name, lastName, email, location } = user
  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">Profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select an image file (max 0.5 MB):
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>
          <FormRow
            type="text"
            defaultValue={name}
            name="name"
            labelText="name"
          />
          <FormRow
            type="text"
            defaultValue={lastName}
            name="lastName"
            labelText="Last Name"
          />
          <FormRow
            type="text"
            defaultValue={email}
            name="email"
            labelText="email"
          />
          <FormRow
            type="text"
            defaultValue={location}
            name="location"
            labelText="location"
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  )
}
