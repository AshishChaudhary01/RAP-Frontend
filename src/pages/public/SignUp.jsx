import { NavLink } from "react-router"

function SignUp() {
  return (
    <div>
      <div>Signup Page:</div>

      <ul className="decoratoin-0">
        <li className="bg-purple-300 underline"><NavLink to={"/auth/login"}>Login to your account</NavLink></li>
      </ul>
    </div>
  )
}

export default SignUp