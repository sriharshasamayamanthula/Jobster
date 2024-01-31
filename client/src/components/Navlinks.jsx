import { useDashboardContext } from "../pages/DashboardLayout"
import { NavLink } from "react-router-dom"
import links from "../utils/links"

export default function Navlinks({ isBigSidebar }) {
  let { toggleSidebar, user } = useDashboardContext()

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link

        if (user.role != "admin" && path==='admin') {
          return
        }

        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={isBigSidebar ? null : toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        )
      })}
    </div>
  )
}
