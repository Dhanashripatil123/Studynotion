import React from "react";
import Study_Logo from "../../assets/Images/Study_Logo.webp"
import { Navbar } from "../../data/navbar-links";
import { Link, matchPath ,useLocation} from "react-router-dom";
import { useSelector } from "react-redux";
import { IoCart } from "react-icons/io5";
import ProfiledropDown from "../core/Auth/ProfiledropDown";

const NavbarLinks = () => {

  const {token} = useSelector((state)=>state.auth);
  const {user} = useSelector((state)=>state.profile);
   const { totalItems } = useSelector((state)=>state.cart);

  const location = useLocation();

  const matchRoutes = (route)=>{
      
     if (!route || typeof route !== "string") {
        return false;
     }

      return matchPath ({path:route,end:true},location.pathname)
  }

   return(
       <div className="flex flex-row h-14 items-center border-b-[1px] border-b-black">
          <div className="flex flex-row">
          
          <Link to="/" className="flex flex-row">
        
             <img
               src={Study_Logo}
               alt=""
               className="ml-9 h-6 w-6"
              ></img>
              <h1 className="text-white">udynotion</h1>
            </Link>
               
               {/* Nav Links */}
               <nav>
                  <ul className="flex gap-x-4 text-blue-50 ml-60">
                     {
                        Navbar.map((link,index) => {
                           return(
                             <li key={index}> 
                                 {
                                    link.title === "catalog" ? (<div></div>):(
                                       <Link to={link?.path}>
                                          <p className={`${matchRoutes(link?.path) ? "text-yellow-500" :"text-amber-50"}`}>
                                            {link.title} 
                                          </p>
                                       </Link>
                                    ) 
                                 }
                             </li>
                           );
                        })
                     }
                  </ul>
               </nav>

               {/* Login/Signup/Dashboard */}
               <div className="flex gap-x-4 ml-80">
                   {
                     user && user?.accountType != "Instructor" && (
                        <Link to="/dashboard/cart" className="relative">
                          <IoCart />
                          {
                           totalItems > 0 && (
                              <span>
                                 {totalItems}
                              </span>
                           )
                          }
                        </Link>
                        
                     ) 
                   }
                   {
                     token === null && (
                     <Link to="/login">
                        <button className="border rounded-md border-white bg-[#2C333F] px-[12px] py-[8px] text-white ml-9">
                              Login
                           </button>
                        </Link>
                     )
                   }
                   {
                     token === null && (
                     <Link to="/signup">
                        <button className="border border-white rounded-md bg-[#2C333F] px-[12px] py-[8px] text-white">
                              Sign up
                           </button>
                        </Link>
                     )
                   }
                   {
                      token !== null && <ProfiledropDown></ProfiledropDown>

                      
                   }
          
               </div>

               
        
         
          </div>
       </div>                                           
   )                                               
}

export default NavbarLinks