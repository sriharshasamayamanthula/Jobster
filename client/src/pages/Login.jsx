import { Link, redirect, Form, useNavigate } from "react-router-dom"
import { Logo, SubmitBtn } from "../components"
import { FormRow } from "../components/index"
import Wrapper from "../assets/wrappers/RegisterAndLoginPage"
import customFetch from "../utils/customeFetch"
import { toast } from "react-toastify"

export const loginAction = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    await customFetch.post("/auth/login", data)
    toast.success("Login Succesfull")
    return redirect("/dashboard")
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

export default function Login() {
  const navigate = useNavigate()

  const loginDemoUser = async () => {
    const data = {
      email: "test@test.com",
      password: "secret123",
    }

    try {
      await customFetch.post("auth/login", data)
      toast.success("Take a test drive")
    } catch (error) {
      toast.error(error?.response?.data?.msg)
    }
    return navigate("/dashboard")
  }
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow type="email" name="email" labelText="Email" />
        <FormRow type="password" name="password" labelText="Password" />
        <SubmitBtn formBtn />
        <button type="button" className="btn btn-block" onClick={loginDemoUser}>
          Explore Website
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  )
}
