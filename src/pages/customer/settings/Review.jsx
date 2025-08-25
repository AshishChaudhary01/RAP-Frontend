import { HiOutlineHome } from "react-icons/hi";
import Breadcrumb from "../../../components/Breadcrumb";

function Review() {
  const breadcrumbItems = [
    { label: "Home", to: "/customer", icon: HiOutlineHome },
    { label: "Review", to: "/settings/review" },
  ];

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <div>
        Review
      </div>
    </div>
  )
}

export default Review