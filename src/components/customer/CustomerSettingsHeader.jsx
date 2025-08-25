import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { HiOutlineIdentification, HiOutlineStar, HiOutlineUser } from 'react-icons/hi'
import { HiOutlineArrowRightOnRectangle, HiOutlineCheckBadge } from 'react-icons/hi2'
import { NavLink } from 'react-router'

function CustomerSettingsHeader() {

  const menuItems = [
    {
      name: "Profile",
      icon: HiOutlineUser,
      to: "/settings/my-profile",
    },
    {
      name: "Personal Information",
      icon: HiOutlineIdentification,
      to: "/settings/personal-information",
    },
    {
      name: "Verification",
      icon: HiOutlineCheckBadge,
      to: "/settings/verification",
    },
    {
      name: "Review",
      icon: HiOutlineStar,
      to: "/settings/review",
    },
    {
      name: "Logout",
      icon: HiOutlineArrowRightOnRectangle,
      to: "/",
    },
  ]
  const menuItemClasses = "block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden";

  return (

    <header className="bg-white top-0 z-10 shadow sticky">
      <nav
        aria-label="Global"
        className="mx-auto sticky flex justify-between items-center max-w-7xl md:px-12 p-3 lg:px-8 gap-x-4"
      >
        {/* Logo */}
        <div className="flex">
          <NavLink to="/customer" className="-m-1.5 p-1.5 flex items-center gap-6">
            <span className="sr-only">RAP</span>
            <img
              alt="RAP Logo"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8  min-w-min"
            />
            <p className="hidden text-indigo-800 text-2xl font-extrabold md:block">RAP</p>
          </NavLink>
        </div>

        {/* Profile/Menu Button  */}
        <Menu as="div" className="relative inline-block">
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold text-gray-900 focus-visible:outline-0 ">
            <img className="h-10 min-w-10 rounded-full"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
              alt="userImage1" />
          </MenuButton>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
          >
            {menuItems.map((item) => {
              return (
                <div key={item.name} className="py-1">
                  <MenuItem>
                    <NavLink to={item.to} className={menuItemClasses}>{item.name}</NavLink>
                  </MenuItem>
                </div>
              )
            })}
          </MenuItems>
        </Menu>
      </nav>
    </header>
  )
}

export default CustomerSettingsHeader