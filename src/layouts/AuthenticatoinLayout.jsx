import { HiOutlineArrowLongLeft } from "react-icons/hi2"
import { NavLink, Outlet } from 'react-router'

function AuthenticatoinLayout() {
  return (
    <div className="h-screen relative">
      {/* Back Button */}
      <NavLink to={"/"} className="absolute flex items-center gap-4 top-10 left-10">
        <HiOutlineArrowLongLeft className="size-10" />
      </NavLink>
      <Outlet />
    </div>
  )
}

export default AuthenticatoinLayout