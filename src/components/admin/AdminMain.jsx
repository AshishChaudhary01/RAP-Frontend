import { Outlet } from 'react-router'

function AdminMain() {
  return (
    <main>
      <div><Outlet /></div>
    </main>
  )
}

export default AdminMain