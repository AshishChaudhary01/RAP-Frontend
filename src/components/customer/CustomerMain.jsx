import { Outlet } from 'react-router'

function CustomerMain() {
  return (
    <main>
      <div className="mx-auto max-w-7xl p-3 md:px-12 lg:px-8 lg:py-8">
        <Outlet />
      </div>
    </main>
  )
}

export default CustomerMain