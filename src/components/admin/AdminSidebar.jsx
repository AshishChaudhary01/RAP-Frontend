import { NavLink } from 'react-router'

function AdminSidebar() {
  return (
    <aside>
      Sidebar:
      <ul className="gap-4">
        <li>item 1</li>
        <li>item 2</li>
        <li>item 3</li>
        <li className='bg-purple-300 underline'><NavLink to={"/"}>Logout</NavLink></li>
      </ul>
    </aside>
  )
}

export default AdminSidebar