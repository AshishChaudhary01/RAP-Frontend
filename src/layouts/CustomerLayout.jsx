import CustomerFooter from "../components/customer/CustomerFooter"
import CustomerHeader from "../components/customer/CustomerHeader"
import CustomerMain from "../components/customer/CustomerMain"

function CustomerLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <CustomerHeader />
      <CustomerMain />
      <CustomerFooter />
    </div>
  )
}

export default CustomerLayout