import {React,useEffect,useState,useRef} from "react";
import Study_Logo from "../../assets/Images/Study_Logo.webp"
import { Navbar } from "../../data/navbar-links";
import { Link, matchPath ,useLocation} from "react-router-dom";
import { useSelector } from "react-redux";
import { IoCart } from "react-icons/io5";
import ProfiledropDown from "../core/Auth/ProfiledropDown";
import AuthDropdown from "./AuthDropdown";
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
            // `apiConnector` returns the response payload ({ success, message, data })
            // so `resp.data` is the array of categories.
            const list = resp?.data || [];

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

    
      


    return (
      <div className="border-b border-black">
         <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center h-16 justify-between">
               <div className="flex items-center gap-4">
                  <Link to="/" className="flex items-center gap-3">
                     <img src={Study_Logo} alt="StudyNotion" className="h-8 w-8" />
                     <h1 className="text-white font-bold">StudyNotion</h1>
            </Link>
               </div>

               {/* Nav Links - desktop */}
               <nav className="hidden lg:block">
                  <ul className="flex items-center gap-6 text-amber-50">
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

                                       <div className={`absolute left-1/2 transform -translate-x-1/2 translate-y-4 top-full z-50 flex flex-col rounded-md bg-white p-4 text-black transition-all duration-150 lg:w-[300px] ${catalogOpen ? 'visible opacity-100 scale-100' : 'invisible opacity-0 scale-95'}`} >

                                          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rotate-45 bg-white"></div>

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
                                          <p className={`${matchRoutes(link?.path) ? "text-yellow-500" :"text-amber-50"}`}>{link.title}</p>
                                       </Link>
                                    )
                                 }
                             </li>)
                        
                       
                     )}
                  </ul>
               </nav>

               {/* Actions (right) */}
               <div className="flex items-center gap-4">
                  {/* cart */}
                  {user && user?.accountType !== 'Instructor' && !location.pathname.startsWith('/catalog') && (
                     <Link to="/dashboard/cart" className="relative text-amber-50">
                        <IoCart className="h-5 w-5" />
                        {totalItems > 0 && (
                           <span className="absolute -top-2 -right-2 bg-yellow-500 text-black rounded-full text-xs px-1">{totalItems}</span>
                        )}
                        </Link>
                  )}

                  {/* Auth buttons */}
                  {token === null ? (
                     <AuthDropdown />
                  ) : (
                     <ProfiledropDown />
                  )}
               </div>
          </div>
         </div>
      </div>
   );
}
                                               
export default NavbarLinks