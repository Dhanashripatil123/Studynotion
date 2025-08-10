import React from "react"
import * as FaIcons from "react-icons/fa"
import { useDispatch } from "react-redux";
import { matchPath } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

export const SidebarLink = ({link,iconName}) => {

     const Icon = FaIcons.FaHome;;
     const location = useLocation();
     const dispatch = useDispatch();

     const matchRoute = (route)=>{
           return matchPath({path:route} , location.pathname)
     }
     return(
        <NavLink
        to={link.path}
        className={`relative px-8 py-2 text-5m font-medium ${matchRoute(link.path) ? "bg-yellow-200":"bg-opacity-0"}`}
//         onClick="" this is homework
        >
         <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-400 ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}>
         </span>

         <div className="flex item-center gap-x-2">
             <Icon className="text-lg">
               <span>{link.name}</span>                                   
              </Icon>                                     
         </div>

        </NavLink>
     )                                             
}