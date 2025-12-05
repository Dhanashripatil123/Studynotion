import {React,useEffect,useState,useRef} from "react";
import Study_Logo from "../../assets/Images/Study_Logo.webp"
import { Navbar } from "../../data/navbar-links";
import { Link, matchPath ,useLocation} from "react-router-dom";
import { useSelector } from "react-redux";
import { IoCart } from "react-icons/io5";
import ProfiledropDown from "../core/Auth/ProfiledropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { fetchCourseCategories } from "../../services/operations/courseDetailsAPI";
import { logout } from "../../services/operations/authAPI";
import { IoIosArrowUp } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";



const subLinksFallback = [
   { title: 'Loading...', link: '#' }
];

const NavbarLinks = () => {
   const dispatch = useDispatch();
   
  const {token} = useSelector((state)=>state.auth);
  const {user} = useSelector((state)=>state.profile);
   const { totalItems } = useSelector((state)=>state.cart);
   const location = useLocation();
   const navigate = useNavigate();

   const [subLink,setSubLinks] = useState([]);
   const [catalogOpen, setCatalogOpen] = useState(false);
   const catalogRef = useRef(null);

   useEffect(()=>{
      const loadCategories = async ()=>{
         try{
            // Curated list of category titles to show in navbar
            const curatedTitles = [
               'AI / ML',
               'Web Dev',
               'Python',
               'Data Science',
               'DSA',
            ];

            // fetch all categories from server and try to resolve each curated title to a real category id
            const resp = await apiConnector('GET', categories.SHOW_ALL_CATEGORIES);
            const list = resp?.data?.data || [];

            const canonical = (str) => String(str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
            const curated = curatedTitles
               .map((title) => {
                  const normalized = canonical(title);
                  const matched = list.find(ct => (canonical(ct?.name) === normalized || canonical(ct?.slug) === normalized));
                  if (matched && matched._id) {
                     return { title, link: `/catalog/${matched._id}` };
                  }
                  // If no matched category in DB, skip adding a fallback slug link so
                  // navbar links always point to real category ids (prevents slug-based requests).
                  return null;
               })
               .filter(Boolean);

            // If nothing matched (rare), fall back to a simple loading placeholder
            setSubLinks(curated.length ? curated : subLinksFallback);
         }catch(err){
            console.error('Failed to set curated category sublinks', err);
            setSubLinks(subLinksFallback);
         }
      }
      loadCategories();
   },[])

     // close catalog dropdown when clicking outside
     useEffect(()=>{
        const handler = (e)=>{
           if(catalogRef.current && !catalogRef.current.contains(e.target)){
              setCatalogOpen(false);
           }
        }
        window.addEventListener('click', handler);
        return ()=> window.removeEventListener('click', handler);
     },[])

  const matchRoutes = (route)=>{
      
     if (!route || typeof route !== "string") {
        return false;
     }

      return matchPath ({path:route,end:true},location.pathname)
  }

      const onHandler = (e) => {
          e.preventDefault()
       dispatch(logout(navigate))
             };

    
      


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
                        Navbar.map((link,index) => (  
                           
                             <li key={index}> 
                                 {
                                    // handle variations of the catalog title (catlog, Catalog, etc.) or path
                                    (link.title && link.title.toString().toLowerCase().includes('cat')) || (link.path && link.path.toString().toLowerCase().includes('/catalog')) ? (
                                    <div ref={catalogRef} className="relative flex items-center gap-2">
                                          <button onClick={(e)=>{ e.stopPropagation(); setCatalogOpen(open => !open); }} className="flex items-center gap-2">
                                            <p>{link.title}</p>
                                            <IoIosArrowUp />
                                          </button>

                                       <div className={`absolute left-[50%] translate-x-[-50%] translate-y-[80%] top-[50%] z-50 flex flex-col rounded-md bg-white p-4 text-black transition-all duration-150 lg:w-[300px] ${catalogOpen ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-95'}`} >

                                         
                                          <div className="absolute left-[50%] top-0 translate-x-[80%] translate-y-[-45%]  h-6 w-6 rotate-45 rounded bg-white ">

                                          </div>

                                                { (subLink && subLink.length) ? (
                                                      subLink.map((s, idx) => (
                                                         <Link to={s.link} key={s.id || idx} onClick={()=> setCatalogOpen(false)}>
                                                            <p className="py-1">{s.title}</p>
                                                         </Link>
                                                      ))
                                                   ) : (
                                                      <div className="py-2 text-sm text-gray-600">No categories</div>
                                                   ) }

                                          </div>
                                    </div>):(
                                       <Link to={link?.path}>
                                          <p className={`${matchRoutes(link?.path) ? "text-yellow-500" :"text-amber-50"}`}>
                                            {link.title} 
                                          </p>
                                            
                                       </Link>
                                    ) 
                                 }
                             </li>)
                        
                       
                     )}
                     
                  </ul>
               </nav>
               </div>
               {/* Login/Signup/Dashboard */}
               <div>
               <div className="flex gap-x-4 ml-80">
               <img
                  src={user?.image}
                  alt={`profile-${user?.firstName}`}
                  className=" aspect-square w-[78px] rounded-full object-cover"
                  onClick={onHandler}
               ></img>
               
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
                                               
   )                                               
}

export default NavbarLinks