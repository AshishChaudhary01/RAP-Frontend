import React from 'react'
import { NavLink } from 'react-router'

function PublicHeader() {
  return (
    <header>
      <div className='bg-purple-300 underline'>
        <ul className='decoration-0 flex gap-4'>
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/about-us"}>About Us</NavLink>
          </li>
          <li>
            <NavLink to={"/our-services"}>Our Services</NavLink>
          </li>
          <li>
            <NavLink to={"/contact-us"}>Contact Us</NavLink>
          </li>
          <li>
            <NavLink to={"/auth/login"}>Login</NavLink>
          </li>
          <li>
            <NavLink to={"/auth/sign-up"}>Signup</NavLink>
          </li>
          <li>
            <NavLink to={"/customer"}>Get Started</NavLink>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default PublicHeader