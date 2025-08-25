import { Outlet } from "react-router"
import CustomerSettingsHeader from "../components/customer/CustomerSettingsHeader"

function CustomerSettingsLayout() {
  return (
    <>
      <CustomerSettingsHeader />
      <main>
        <div
          className="justify-between items-center
          mx-auto max-w-7xl p-3 md:my-0 md:px-12 lg:px-8 md:py-8
          min-h-[90vh] md:min-h-[90vh] max-h-screen
        ">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default CustomerSettingsLayout