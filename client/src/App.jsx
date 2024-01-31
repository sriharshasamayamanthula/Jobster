import { RouterProvider, createBrowserRouter } from "react-router-dom"
import {
  HomeLayout,
  Login,
  Register,
  DashboardLayout,
  Error,
  Landing,
  AddJob,
  AllJobs,
  Profile,
  Stats,
  Admin,
  EditJob,
} from "./pages/index"

import { registerAction } from "./pages/Register"
import { loginAction } from "./pages/Login"
import { dashboardLoader } from "./pages/DashboardLayout"
import { addJobAction } from "./pages/AddJob"
import { allJobsLoader } from "./pages/AllJobs"
import { editJobLoader } from "./pages/EditJob"
import { editJobAction } from "./pages/EditJob"
import { deleteJobAction } from "./pages/DeleteJob"
import { adminLoader } from "./pages/Admin"
import { profileAction } from "./pages/Profile"
import { statsLoader } from "./pages/Stats"

export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true"
  document.body.classList.toggle("dark-theme", isDarkTheme)
  return isDarkTheme
}

checkDefaultTheme()

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction,
          },
          {
            path: "all-jobs",
            element: <AllJobs />,
            loader: allJobsLoader,
          },
          {
            path: "admin",
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path: "profile",
            element: <Profile />,
            action: profileAction,
          },
          {
            path: "stats",
            element: <Stats />,
            loader: statsLoader,
          },
          {
            path: "edit-job/:id",
            element: <EditJob />,
            loader: editJobLoader,
            action: editJobAction,
          },
          {
            path: "delete-job/:id",
            // element: <DeleteJob />,
            action: deleteJobAction,
          },
        ],
      },
      {
        path: "error",
        element: <Error />,
      },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
