import { Link, useRouteError } from "react-router-dom"
import Wrapper from "../assets/wrappers/ErrorPage";
import img from '../assets/images/not-found.svg'

export default function Error() {

  const err=useRouteError();
  console.log(err);
  if(err.status===404){
    return (
      <Wrapper>
        <div>
          <img src={img} alt="Not-found"></img>
          <h1>Oops! We did not find the page</h1>
          <Link to="/dashboard">Back home</Link>
        </div>
      </Wrapper>
    )
  }
  return (
    <div>
      <h2>Something went wrong ....</h2>
    </div>
  )
}
