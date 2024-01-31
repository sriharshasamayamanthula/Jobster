import { Form, Link, redirect } from "react-router-dom"
import { toast } from "react-toastify"
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import { Logo, SubmitBtn } from "../components/index"
import { FormRow } from "../components/index"
import customFetch from "../utils/customeFetch"

export const registerAction = async ({ request }) => {
  const formData = await request.formData()
  const Fdata = Object.fromEntries(formData)

  try {
    let { data } = await customFetch.post("/auth/register", Fdata)
    toast.success("Registration succesfull")
    return redirect("/login")
  } catch (error) {
    toast.error(error.response.data.msg)
    console.log(error)
    return error
  }
}

export default function Register() {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" labelText="Name" />
        <FormRow type="text" name="lastName" labelText="LastName" />
        <FormRow type="email" name="email" labelText="Email" />
        <FormRow type="text" name="location" labelText="Location" />
        <FormRow type="password" name="password" labelText="Password" />
        <SubmitBtn formBtn />
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}
