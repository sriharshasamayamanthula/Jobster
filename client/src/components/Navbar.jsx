import Wrapper from "../assets/wrappers/Navbar"
import { useDashboardContext } from "../pages/DashboardLayout"
import { FaAlignLeft } from "react-icons/fa"
import { Logo } from "../components/index.js"
import LogoutContainer from "../components/LogoutContainer"
import ThemeToggle from "./ThemeToggle.jsx"

export default function Navbar() {
  const { toggleSidebar } = useDashboardContext()
  return (
    <Wrapper>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className="logo-text">dashboard</h4>
        </div>
        <ThemeToggle />
        <LogoutContainer />
      </div>
    </Wrapper>
  )
}
