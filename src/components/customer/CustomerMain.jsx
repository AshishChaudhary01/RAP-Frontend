import { Outlet } from 'react-router'

function CustomerMain() {
  return (
    <main>
      <div>Customer Main</div>
      <div><Outlet /></div>
    </main>
  )
}

export default CustomerMain