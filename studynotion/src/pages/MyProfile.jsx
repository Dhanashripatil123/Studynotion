import React from "react";
import IconButton from "../components/common/IconButton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
     const {user} = useSelector((state)=>state.profile)
     const navigate = useNavigate();                                             
     return(   
         <div>
            <h1>My Profile</h1>

            <div>
                <div>
                  <img className="{user?.image} aspect-square w-[78px] rounded-full object-cover"
                  alt={`profile-${user?.firstName}`}
                  
                  ></img>  
                  <div>
                    <p>{user?.firstname + " "+ user?.lastName}</p>
                    <p>{user?.email}</p>
                 </div>                              </div>                                  
            </div>
            <IconButton text="Edit" onclick={()=>{
               navigate("/dashboard/settings")                                   
            }}>

            </IconButton>
         </div>
     )
}

export default MyProfile