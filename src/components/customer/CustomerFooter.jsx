import { NavLink } from 'react-router'

function CustomerFooter() {
  return (
    <footer>
      <nav>
        <ul>
          <li><NavLink to={"/customer"}>Home</NavLink></li>
          <li><NavLink to={"/customer/rentals"}>Rentals</NavLink></li>
          <li><NavLink to={"/customer/add-listing"}>Add Listing</NavLink></li>
          <li><NavLink to={"/customer/my-listings"}>My Listings</NavLink></li>
          <li><NavLink to={"/customer/menu"}>Menu</NavLink></li>
        </ul>
      </nav>
    </footer>
  )
}

export default CustomerFooter