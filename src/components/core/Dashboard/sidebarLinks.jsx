import React from "react";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io5";
import { NavLink, useLocation, matchPath } from "react-router-dom";

const iconMap = {
     FaUser: FaIcons.FaUser,
     FaTachometerAlt: FaIcons.FaTachometerAlt,
     FaBook: FaIcons.FaBook,
     FaPlus: FaIcons.FaPlus,
     IoSettingsOutline: IoIcons.IoSettingsOutline,
     FaGraduationCap: FaIcons.FaGraduationCap,
     FaHistory: FaIcons.FaHistory,
};
const SidebarLink = ({ link }) => {
     const location = useLocation();
     const matchRoute = (route) => matchPath({ path: route }, location.pathname);
     const Icon = iconMap[link.icon] || FaIcons.FaHome;

     return (
          <NavLink
               to={link.path}
               className={`relative px-8 py-2 text-sm font-medium flex items-center gap-x-2 transition-colors duration-200 hover:bg-gray-800 hover:text-white ${matchRoute(link.path) ? "bg-yellow-400 text-black font-semibold" : "text-gray-300 hover:text-white"
                    }`}
          >
                         <span
                    className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-400 transition-opacity ${matchRoute(link.path) ? "opacity-100" : "opacity-0"
                         }`}
                         />
                         <Icon className={`text-lg transition-colors duration-200 ${matchRoute(link.path) ? "text-black" : "text-gray-400 group-hover:text-white"}`} />
                         <span>{link.name}</span>
          </NavLink>
     );
};

export default SidebarLink
