import { NavLink } from "react-router"

function Login() {
  return (
    <div>
      <div>Login Page:</div>

      <ul className="decoratoin-0">
        <li className="bg-purple-300 underline"><NavLink to={"/auth/sign-up"}>Create an account</NavLink></li>
      </ul>
    </div>
  )
}

export default Login