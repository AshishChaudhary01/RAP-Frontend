import CustomerFooter from "../components/customer/CustomerFooter"
import CustomerHeader from "../components/customer/CustomerHeader"
import CustomerMain from "../components/customer/CustomerMain"

function CustomerLayout() {
  return (
    <>
      <CustomerHeader />
      <CustomerMain />
      <CustomerFooter />
    </>
  )
}

export default CustomerLayout