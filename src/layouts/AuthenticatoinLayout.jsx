import { NavLink, Outlet } from 'react-router'

function AuthenticatoinLayout() {
  return (
    <>
      <div>
        <ul className="decoration-0">
          <li className='underline'><NavLink to={"/"}>Home</NavLink></li>
        </ul>
      </div>
      <Outlet />
    </>
  )
}

export default AuthenticatoinLayout