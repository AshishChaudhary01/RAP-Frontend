import { HiOutlineHome } from "react-icons/hi";
import Breadcrumb from "../../../components/Breadcrumb";

function Verification() {
  const breadcrumbItems = [
    { label: "Home", to: "/customer", icon: HiOutlineHome },
    { label: "Verification", to: "/settings/verification" },
  ];

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <div>
        Verification
      </div>
    </div>
  )
}

export default Verification