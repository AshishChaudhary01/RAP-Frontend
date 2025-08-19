import React from 'react'
import { NavLink } from 'react-router'

function Menu() {
  return (
    <div>
      Menu Content:
      <ul className="decoration-0 underline bg-purple-300">
        <li><NavLink to={"/"}>Logout</NavLink></li>
      </ul>
    </div>
  )
}

export default Menu