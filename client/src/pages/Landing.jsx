import Wrapper from "../assets/wrappers/LandingPage"
import main from "../assets/images/main.svg"
import { Link } from "react-router-dom"
import { Logo } from "../components/index.js"
export default function Landing() {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>Tracker</span>
          </h1>
          <p>
            Introducing Jobster, your ultimate job-tracking companion.
            Seamlessly navigate through its intuitive register and login pages
            for effortless access. With its robust features, effortlessly add,
            delete, and update job listings to stay organised. Dive deeper into
            your progress with insightful charts showcasing total application
            trends over the past six months. Jobster: Empowering your job hunt
            journey like never before.
          </p>
          <Link to="/login" className="btn">
            Login/Demo User
          </Link>
        </div>
        <img src={main} alt="Searching for Job?" className="img main-img"></img>
      </div>
    </Wrapper>
  )
}
