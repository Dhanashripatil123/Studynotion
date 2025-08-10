import React from "react"
import { useSelector } from "react-redux";
import {Outlet} from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar"; 

const Dashboard = () => {
      
    const {loading:authLoading} = useSelector((state)=>state.auth);                                             
    const {loading:profileLoading} = useSelector((state)=>state.profile); 


    

    if(profileLoading || authLoading){
         return(
               <div className="mt-10">
                   Loading....
               </div>                                   
         )                                         
    }


   return(
        <div className="relative flex min-3 min-h-[calc(100vh-3.5rm)]">
        <Sidebar></Sidebar>
        <div className="w-[100%] h-full overflow-auto">
           <div className="mx-auto w-11/12 max-w-[100px] py-10">
            <Outlet></Outlet>
           </div>
        </div>
        </div>                                          
   )
}

export default Dashboard