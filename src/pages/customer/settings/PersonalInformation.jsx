import { HiOutlineHome } from "react-icons/hi";
import Breadcrumb from "../../../components/Breadcrumb";

function PersonalInformation() {
  const breadcrumbItems = [
    { label: "Home", to: "/customer", icon: HiOutlineHome },
    { label: "Personal Information", to: "/settings/personal-information" },
  ];

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <div>
        Personal Information
      </div>
    </div>
  )
}

export default PersonalInformation