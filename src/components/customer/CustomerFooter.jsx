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

  const itemClasses = "flex flex-col text-gray-600";
  const iconClasses = "h-5 w-auto";

  return (
    <footer className="sticky bottom-0 z-10 bg-indigo-100">
      <nav className="mx-auto justify-around p-3 md:p-4 max-w-2xl">
        <ul className="flex justify-around gap-x-4 text-sm">
          {menuItems.map((item) => {
            return (
              <li>
                <NavLink to={item.to} className={itemClasses} >
                  <div className="flex mx-auto mb-2">{<item.icon className={iconClasses}/>}</div>
                  <div>{item.name}</div>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </footer>
  )
}

export default CustomerFooter