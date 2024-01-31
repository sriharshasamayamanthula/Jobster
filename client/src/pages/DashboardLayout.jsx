import { Outlet, useLoaderData, redirect, useNavigate } from "react-router-dom"
import { BigSidebar, SmallSidebar, Navbar } from "../components"
import Wrapper from "../assets/wrappers/Dashboard"
import { createContext, useContext, useState } from "react"
import { checkDefaultTheme } from "../App"
import customFetch from "../utils/customeFetch"
import { toast } from "react-toastify"

export const dashboardLoader = async () => {
  console.log("Dashboard layout loader")
  try {
    let { data } = await customFetch.get("/users/current-user")
    return data
  } catch (error) {
    return redirect("/") //redirect to landing page if any error occurs
  }
}

let DashboardContext = createContext()

export default function DashboardLayout() {
  let { user } = useLoaderData()
  const navigate = useNavigate()
  const [showSidebar, setShowSidebar] = useState(false)
  const [isDarkTheme, setisDarkTheme] = useState(checkDefaultTheme)

  let toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  let toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme
    setisDarkTheme(newDarkTheme)
    document.body.classList.toggle("dark-theme", newDarkTheme)
    localStorage.setItem("darkTheme", newDarkTheme)
  }

  let logoutUser = async () => {
    navigate("/")
    await customFetch.get("/auth/logout")
    toast.success("Logged out")
  }

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        logoutUser,
        toggleDarkTheme,
        toggleSidebar,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}

//Using custom hook to return DashboardContext instaed of just exporting context and importing in other files.
export function useDashboardContext() {
  return useContext(DashboardContext)
}
