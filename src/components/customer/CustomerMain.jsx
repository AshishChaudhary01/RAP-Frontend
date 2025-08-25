import { Outlet } from 'react-router'

function CustomerMain() {
  return (
    <main>
      <div className="mx-auto max-w-7xl lg:p-8 p-4">
        <Outlet />
      </div>
    </main>
  )
}

export default CustomerMain