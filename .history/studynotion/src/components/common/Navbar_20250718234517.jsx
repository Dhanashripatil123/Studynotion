import {React,useEffect,useState} from "react";
import Study_Logo from "../../assets/Images/Study_Logo.webp"
import { Navbar } from "../../data/navbar-links";
import { Link, matchPath ,useLocation} from "react-router-dom";
import { useSelector } from "react-redux";
import { IoCart } from "react-icons/io5";
import ProfiledropDown from "../core/Auth/ProfiledropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { IoIosArrowUp } from "react-icons/io";

const subLinks = [
     {
      title: "python",
      link:"/catalog/python"
     },
     {
      title: "web app",
      link:"/catalog/web-development"
     }
]

const NavbarLinks = () => {

  const {token} = useSelector((state)=>state.auth);
  const {user} = useSelector((state)=>state.profile);
   const { totalItems } = useSelector((state)=>state.cart);
   const location = useLocation();

   const [subLink,setSubLinks] = useState([]);

   // const fetchSublinks = async () => {
   //    try {
   //       const result = await apiConnector("GET", categories.CATEGORIES_API);
   //       console.log("printing sublinks result:", result);
   //       setSubLinks(result.data.data)
   //    }
   //    catch (error) {
   //       console.log("could not fetch the categories")
   //    }
   // }

   // useEffect( ()=>{
   //    // fetchSublinks()
   // },[])

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
                  <ul className="flex gap-x-5 text-blue-50 ml-60">
                     {
                        Navbar.map((link,index) => {
                          
                             <li key={index}> 
                                 {
                                    link.title === "catalog" ? (
                                    <div className="relative flex items-center gap-2 group">
                                          <p >{link.title}</p>
                                          <IoIosArrowUp />

                                          <div className="invisible absolute left-[50%] top-[50%] flex flex-col rounded-md bg-blend-color p-4 text-black opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]" >

                                          
                                          <div className="absolute left-[100%] top-0 h-6 w-6 rotate-45 rounded bg-white ">

                                          </div>
                                          </div>

                                    </div>):(
                                       <Link to={link?.path}>
                                          <p className={`${matchRoutes(link?.path) ? "text-yellow-500" :"text-amber-50"}`}>
                                            {link.title} 
                                          </p>
                                            
                                       </Link>
                                    ) 
                                 }
                             </li>
                           
                        })
                     }
                  </ul>
               </nav>

               {/* Login/Signup/Dashboard */}
               <div>
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
               </div>
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