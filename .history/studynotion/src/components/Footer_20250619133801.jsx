import { React } from "react";
import {Footer} from "../data/Footer";
import {Link} from "react-router-dom";
import Study_Logo  from "../assets/Images/Study_Logo.webp"

//ImagesStudy_Logo
import { FaGoogle,FaFacebook } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";


//Icons

const BottomFooter = ["Privacy Policy","Cookie Policy" , "Terms"];
const Resoures = [
     "Article",
     "Block",
     "chart challenges",
     "code challenges",
     "Docs",
     "Projects",
     "Videos",
     "workspace",                                             
];

const Plans = ["Paid membership","For student","Buseness solution"]
const Community = ["Farums","Chapters","Events"]

const FooterLinks = () => {
                                                  
   return(
      <div className="bg-[#424854]">
       <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-white leading-6 py-14">
        <div className="border-b w-[100%] flex flex-col lg:flex-row border-black">
           {/* {section 1} */}
           <div className="lg:w-[50%] flex flex-wrap flex-col justify-between">
            {/* <logo> */}
             <div className="flex flex-row">
                <img
                               src={Study_Logo}
                               alt=""
                               className= "ml-9 h-6 w-6"
                            ></img>
                  <p className=" text-white text-2xl  ">tudynotion</p>
                 </div>
               </div>

             <div className="flex flex-col items-center mr-80">
                    <p className="text-white flex flex-col text-xl">company</p>  
                    <p className="text-[#161e29]">About</p>  
                     <p className="text-[#161e29]">camera</p>  
                     <p className="text-[#161e29]">adfgifj</p> 

                     <div className="flex flex-row gap-1">
                        <FaGoogle className="text-[#161e29]"></FaGoogle>
                        <FaFacebook className="text-[#161e29]"></FaFacebook>
                        <RiTwitterXLine className="text-[#161e29]"></RiTwitterXLine>
                     </div>

                     </div>
                   
                 

                  {/* section 2          */}
                  <div className="flex flex-col">
                     <h3 className="text-xl font-semibold mb-4">Resources</h3>
                        {
                           Resoures.map((element, index) => {
                              return (
                                 <div key={index} >{element}</div>
                              )
                           })
                        }

                     </div>
                     
                    
                
             
           </div>
        </div>
                                              

       
   )                                                
}

export default FooterLinks