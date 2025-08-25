import { HiOutlineHome } from "react-icons/hi";
import Breadcrumb from "../../../components/Breadcrumb";

function MyProfile() {
  const breadcrumbItems = [
    { label: "Home", to: "/customer", icon: HiOutlineHome },
    { label: "My Profile", to: "/settings/my-profile" },
  ];

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <div>
        My Profile
      </div>
    </div>
  )
}

export default MyProfile