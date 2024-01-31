import Wrapper from "../assets/wrappers/LandingPage"
import main from '../assets/images/main.svg'
import { Link } from "react-router-dom"
import { Logo } from "../components/index.js"
export default function Landing() {
  return (
    <Wrapper>
      <nav>
        <Logo/>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>Job <span>Tracker</span></h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id officia excepturi commodi velit, ad nam ab, nisi ea sunt at est magni ipsum error officiis rem laborum fugit optio nobis.</p>
          <Link to="/register" className="btn register-link">Register</Link>
          <Link to="/login" className="btn">Login/Demo User</Link>
        </div>
        <img src={main} alt="Searching for Job?" className="img main-img"></img>
      </div>
    </Wrapper>
  )
}
