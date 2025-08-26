import { HiOutlineBookOpen, HiOutlineCollection, HiOutlineFire, HiOutlineGlobeAlt, HiOutlineSparkles } from "react-icons/hi"
import { NavLink } from "react-router"
import CardSlider from "../../components/customer/CardSlider";

function CustomerHome() {
  const categories = [
    { name: "Miscellaneous", to: "miscellaneous", icon: HiOutlineCollection },
    { name: "Outdoor Gears", to: "outdoor-gears", icon: HiOutlineGlobeAlt },
    { name: "Sports", to: "sports", icon: HiOutlineFire },
    { name: "Books", to: "books", icon: HiOutlineBookOpen },
    { name: "Party Supplies", to: "party-supplies", icon: HiOutlineSparkles },
  ]
  
  const listings = [
    {
      id: 1,
      title: "Camping Tent",
      rent: "Nrs. 1000",
      location: "Pokhara, Nepal",
      image: "https://images.unsplash.com/photo-1616848657269-c3c7b227fc65?q=80&w=871&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Mountain Bike",
      rent: "Nrs. 1500",
      location: "Kathmandu, Nepal",
      image: "https://images.unsplash.com/photo-1737726361276-ff086b262c62?q=80&w=880&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Party Speakers",
      rent: "Nrs. 800",
      location: "Bhaktapur, Nepal",
      image: "https://images.unsplash.com/photo-1616696038562-574c18066055?q=80&w=940&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Kayak",
      rent: "Nrs. 1200",
      location: "Lumbini, Nepal",
      image: "https://images.unsplash.com/photo-1706724728271-a81750af4b8f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8a2F5YWtpbmd8ZW58MHwwfDB8fHwy"
    },
    {
      id: 5,
      title: "Rock Climbing Gear",
      rent: "Nrs. 1800",
      location: "Nagarkot, Nepal",
      image: "https://images.unsplash.com/photo-1619304661750-c2ce10fa0a53?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJvY2slMjBjbGltYmluZyUyMGdlYXJ8ZW58MHwwfDB8fHwy"
    },
    {
      id: 6,
      title: "Hiking Backpack",
      rent: "Nrs. 900",
      location: "Annapurna, Nepal",
      image: "https://images.unsplash.com/photo-1622260614927-208cfe3f5cfd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SGlraW5nJTIwQmFja3BhY2t8ZW58MHwwfDB8fHwy"
    },
    {
      id: 7,
      title: "Surfboard",
      rent: "Nrs. 2000",
      location: "Chitwan, Nepal",
      image: "https://images.unsplash.com/photo-1629481657693-90665fc83bad?q=80&w=721&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 8,
      title: "Tent Heater",
      rent: "Nrs. 500",
      location: "Rara, Nepal",
      image: "https://images.unsplash.com/photo-1616848657269-c3c7b227fc65?q=80&w=871&auto=format&fit=crop"
    },
    {
      id: 9,
      title: "Photography Drone",
      rent: "Nrs. 3500",
      location: "Bandipur, Nepal",
      image: "https://images.unsplash.com/photo-1697994309887-c6e669268e7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFBob3RvZ3JhcGh5JTIwRHJvbmV8ZW58MHx8MHx8fDI%3D"
    },
    {
      id: 10,
      title: "Snowboard",
      rent: "Nrs. 2200",
      location: "Manang, Nepal",
      image: "https://images.unsplash.com/photo-1498146831523-fbe41acdc5ad?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  const itemClasses = ({ isActive }) =>
    `flex flex-col items-center text-xs transition-colors duration-200 px-1 py-0 md:px-4 md:py-2 text-center
     ${isActive ? "bg-indigo-600 text-white font-semibold" : " text-gray-500 hover:bg-gray-100"}`;

  const iconClasses = "h-auto w-4 md:w-5";

  return (
    <div>
      {/* Category Slider */}
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

      {/* Newest Listings */}
        <CardSlider items={listings} category="Newest Listings" />

      {/* Outdoor Gear Listings */}
        <CardSlider items={listings} category="Outdoor Gear" />

      {/* Tools Listings */}
        <CardSlider items={listings} category="Tools" />
    </div>
  );
}

export default CustomerHome