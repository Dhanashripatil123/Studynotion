import React from "react";
import IconButton from "../../common/IconButton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
     const {user} = useSelector((state)=>state.profile)
     const navigate = useNavigate();                                             
     return( 
      <div>
         <div className="text-white">
            <h1>My Profile</h1>

            <div>
                <div>
                  <img 
                  src={user?.image}
                  alt={`profile-${user?.firstName}`}
                    className=" aspect-square w-[78px] rounded-full object-cover"
                  ></img>  
                  <div>
                    <p>{user?.firstname + " "+ user?.lastName}</p>
                    <p>{user?.email}</p>
                    </div>
                    </div>                                  
            </div>
            <IconButton text="Edit" onclick={()=>{
               navigate("/dashboard/settings")                                   
            }}>

            </IconButton>


         </div>

         {/* section 2 */}
         <div className="text-white">
          <div>
            <p>About</p>
            <IconButton
            text="Edit"
            onclick={()=>{
              navigate("/dashboard/settings")
            }}
            ></IconButton>
            <p>Additional Deatail</p>
          </div>
          <p> { user?.additionalDeatails ?.about ?? "write something about yourself" }</p>
         </div>

         {/* section 3 */}
         <div className="text-white">
            <div className="text-white">
              <p>Personal Details</p>
              <IconButton
               text="Edit"
               onclick={() => {
                 navigate("/dashboard/settings")
               }}
              ></IconButton>
            </div>
               <div className="text-white">
                <p>First Name</p>
                <p>{user?.firstName}</p>
               </div>
               <div>
                <p>Email</p>
                <p>{user?.email}</p>
               </div>
               <div>
                <p>Gender</p>
                <p>{user?.additionalDeatails?.gender}</p>
               </div>
               <div>
                <p>Last Name</p>
                <p>{user?.lastName}</p>
               </div>
               <div>
                <p>Contact Number</p>
             <p>{user?.additionalDeatails?.contactNumber}</p>
               </div>
               </div>
               <div >
                <p>Date of Birth</p>
             <p>{user?.additionalDeatails?.contactNumber}</p>
               </div>
               <div>
           <p>dateOfBirth</p>
           <p>{user?.additionalDeatails?.dateOfBirth}</p>
               </div>
            <div>

            </div>
         </div>
         
        )
}

export default MyProfile