import Wrapper from "../assets/wrappers/SmallSidebar"
import { FaTimes } from "react-icons/fa"

import Logo from "./Logo"
import { useDashboardContext } from "../pages/DashboardLayout"

import Navlinks from "./Navlinks"

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext()
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes /> {/* X symbol here. When we click on x, it closes small side bar */}
          </button>
          <header>
            <Logo />
          </header>
          <Navlinks/>
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar
