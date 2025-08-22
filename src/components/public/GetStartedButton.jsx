import { NavLink } from "react-router"

function GetStartedButton() {
  return (
    <NavLink
      to={"/customer"}
      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Get started
    </NavLink>)
}

export default GetStartedButton