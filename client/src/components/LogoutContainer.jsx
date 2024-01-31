import { FaUserCircle, FaCaretDown } from "react-icons/fa"
import Wrapper from "../assets/wrappers/LogoutContainer"
import { useState } from "react"
import { useDashboardContext } from "../pages/DashboardLayout"

export default function LogoutContainer() {
  const { user, logoutUser } = useDashboardContext()
  const [showLogout, setShowLogout] = useState(false)

  return (
    <Wrapper>
      <button
        type="button"
        onClick={() => setShowLogout(!showLogout)}
        className="btn logout-btn"
      >
        {user.avatar ? (
          <img src={user.avatar} className="img"></img>
        ) : (
          <FaUserCircle />
        )}
        {user?.name}
        <FaCaretDown />
      </button>
      <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
        <button type="button" className="dropdown-btn" onClick={logoutUser}>
          logout
        </button>
      </div>
    </Wrapper>
  )
}
