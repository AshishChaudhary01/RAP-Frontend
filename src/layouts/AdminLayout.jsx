import AdminFooter from "../components/admin/AdminFooter"
import AdminHeader from "../components/admin/AdminHeader"
import AdminMain from "../components/admin/AdminMain"
import AdminSidebar from "../components/admin/AdminSidebar"

function AdminLayout() {
  return (
    <>
      <AdminHeader />
      <AdminSidebar />
      <AdminMain />
      <AdminFooter />
    </>
  )
}

export default AdminLayout