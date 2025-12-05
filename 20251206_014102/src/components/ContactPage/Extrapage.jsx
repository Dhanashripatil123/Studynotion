import React from "react";
import { GrChatOption } from "react-icons/gr";
import { SiCompilerexplorer } from "react-icons/si";
import { FaPhoneAlt } from "react-icons/fa";

const Extrapage = ()=>{
    return(
       <div className="bg-gray-500 flex flex-col">
        <div>                                      
       <div className="flex flex-row gap-1">
           <GrChatOption />
        <h3 className="text-white">Chat on us</h3>                                        
       </div>
       <p>Our friendly team is here to help.</p>
       <p>info@studynotion.com</p>
       </div> 

     <div className="flex flex-col gap-2"> 
       <div className="flex flex-row">
          <SiCompilerexplorer />
       <h3 className="text-white">Visit us</h3>                                         
     </div>                                                                                
      
  <p>
    Come and say hello at our office HQ. <br />
    Ashya Nagar 1st Block Tat Cross, Rammurthy nagar, <br />
    Bangalore - 560016
  </p>
       </div> 

 <div className="flex flex-col gap-2">                                      
       <div className="flex flex-row">
           <FaPhoneAlt />
       <h3 className="text-white">Call us</h3>                                       
       </div>
  <p>Mon - Fri From 8am to 5pm</p>
  <p>+123 456 7869</p>
       
       </div>  

       </div>                                           
    )
}

export default Extrapage