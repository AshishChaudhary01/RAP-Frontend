import { HiOutlineHome, HiOutlinePlusCircle } from 'react-icons/hi'
import { HiListBullet, HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'
import { NavLink } from 'react-router'

function CustomerFooter() {
  const menuItems = [
    {
      name: "Home",
      to: "/customer",
      icon: HiOutlineHome,
    },
    {
      name: "Rentals",
      to: "/customer/rentals",
      icon: HiOutlineChatBubbleLeftRight,
    },
    {
      name: "Add Listing",
      to: "/customer/add-listing",
      icon: HiOutlinePlusCircle,
    },
    {
      name: "My Listings",
      to: "/customer/my-listings",
      icon: HiListBullet,
    },
  ]

  const itemClasses = ({ isActive }) =>
    `flex flex-col items-center text-sm transition-colors duration-200
   ${isActive ? "text-indigo-600 font-semibold" : "text-gray-600 hover:text-indigo-500"}`;

  const iconClasses = "h-5 w-auto";

  return (
    <footer className="sticky bottom-0 z-10 bg-indigo-100">
      <nav className="mx-auto justify-around p-3 max-w-2xl">
        <ul className="flex justify-around gap-x-4 text-sm">
          {menuItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                // Don’t match partial paths, only mark me active if the path matches exactly.
                end={item.to === "/customer"}
                className={itemClasses}
              >
                <div className="flex mx-auto mb-2">
                  <item.icon className={iconClasses} />
                </div>
                <div>{item.name}</div>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  )
}

export default CustomerFooter