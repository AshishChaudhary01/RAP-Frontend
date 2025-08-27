import { HiOutlineBadgeCheck, HiOutlineBookOpen, HiOutlineCollection, HiOutlineFire, HiOutlineGlobeAlt, HiOutlineSparkles } from "react-icons/hi"
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { NavLink } from "react-router"

function CategorySlider() {

  const categories = [
    { name: "Newest", to: "newest", icon: HiOutlineBadgeCheck },
    { name: "Miscellaneous", to: "miscellaneous", icon: HiOutlineCollection },
    { name: "Outdoor Gears", to: "outdoor-gears", icon: HiOutlineGlobeAlt },
    { name: "Tools", to: "outdoor-gears", icon: HiOutlineWrenchScrewdriver },
    { name: "Sports", to: "sports", icon: HiOutlineFire },
    { name: "Books", to: "books", icon: HiOutlineBookOpen },
    { name: "Party Supplies", to: "party-supplies", icon: HiOutlineSparkles },
  ]

  const itemClasses = ({ isActive }) =>
    `flex flex-col items-center text-xs transition-colors duration-200 px-1 py-0 md:px-4 md:py-2 text-center
     ${isActive ? "bg-gray-200 rounded-md" : " text-gray-500 hover:bg-gray-100"}`;

  const iconClasses = "h-auto w-4 md:w-5";

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto">
        <nav className="flex gap-x-2 md:gap-x-4 overflow-x-auto no-scrollbar p-2 md:px-8  rounded-sm outline-1 outline-gray-300
           [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden bg-gray-50">
          {categories.map((cat) => (
            <NavLink
              key={cat.name}
              to={cat.to}
              className={itemClasses}
            >
              <div className="flex mx-auto mb-1">
                <cat.icon className={iconClasses} />
              </div>
              <div className="">{cat.name}</div>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default CategorySlider