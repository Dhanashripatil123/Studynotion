import React, { useState } from "react"

import { sidebarLinks } from "../../../data/dashboard-links";
// import logout from "../../services/operation/IconButton";
import {useDispatch, useSelector} from 'react-redux'
import { SidebarLink } from "./sidebarLinks";
import { IoSettingsOutline } from "react-icons/io5";
import {useNavigate} from 'react-router-dom';
import { GoSignOut } from "react-icons/go";

const Sidebar = ()=>{

   const {user,loadings:profileLoading} = useSelector((state)=> state.profile);
   const {loading:authLoading} = useSelector((state)=>state.auth);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [confirmationModal,setConfirmationModal] = useState(null)

   if(profileLoading||authLoading){
      <div className="mt-10">
         Loading...
      </div>
   }
   
   return(
      <div className="flex min-w-[222px] flex-col borde-r-[1px] border-r-black h-[calc[100vh-3.5rem)] bg-black py-10 text-white">

         <div className="flex flex-col">
             {
               sidebarLinks.map((link,index) => {
                if(link.type && user?.accounType !== link.type) return null;
                return(
                   <SidebarLink key={link.id} link={link} iconName={link.icon}/>
               )
               })
             }
         </div> 

         <div className="mx-auto  items-center bg-black">
           <div className="flex flex-col">
             <SidebarLink
                link={{name:"Settings",path:"dashboard/settings"}}
                iconName='VsSettingsGear'
             >

               <button onClick={()=>setConfirmationModal({
                  text1:"Are you sure ?",
                  text2:"You will be logged out of your accounts",
                  btn1Text:"Loggout",
                  btn2Text:"cancel",
                  btn1Handler:  () => dispatch({navigate}),
                  btn2Handler: () => setConfirmationModal(null),

               })}
               className="text-5m font-medium text-black"
               >

                  <div className="flex items-center gap-x-2 ">
                        <GoSignOut  className="text-lg"/>
                        <span>Logout</span>
                  </div>
               </button>
               
             </SidebarLink>()
            </div> 
         </div>  
         {confirmationModal && <confirmationModal modalData={confirmationModal}></confirmationModal>}                                   
      </div>                                            
   )
}

export default Sidebar
