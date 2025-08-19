import CustomerFooter from "../components/customer/CustomerFooter"
import CustomerHeader from "../components/customer/CustomerHeader"
import CustomerMain from "../components/customer/CustomerMain"
import PublicFooter from "../components/public/PublicFooter"
import PublicMain from "../components/public/PublicMain"

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