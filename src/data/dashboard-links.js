import { ACCOUNT_TYPE } from "../utils/constants"

// Sidebar links for the dashboard

export const sidebarLinks = [
  { id: 1, name: "My Profile", path: "/dashboard/my-profile", icon: "FaUser" },
  { id: 2, name: "Dashboard", path: "/dashboard", type: ACCOUNT_TYPE.INSTRUCTOR, icon: "FaTachometerAlt" },
  { id: 3, name: "My Courses", path: "/dashboard/my-courses", type: ACCOUNT_TYPE.INSTRUCTOR, icon: "FaBook" },
  { id: 4, name: "Add Course", path: "/dashboard/add-course", type: ACCOUNT_TYPE.INSTRUCTOR, icon: "FaPlus" },
  { id: 5, name: "Settings", path: "/dashboard/settings", icon: "IoSettingsOutline" },
  {
    id: 6,
    name: "Add to Cart",
    path: "/dashboard/cart",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "FaShoppingCart",
  },
  {
    id: 7,
    name: "Enrolled Courses",
    path: "/dashboard/enrolled-courses",
    type: ACCOUNT_TYPE.STUDENT,
    icon: "VscMortarBoard",
  },
];

