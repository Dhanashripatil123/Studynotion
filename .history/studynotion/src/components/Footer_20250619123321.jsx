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
      <div className="bg-[#838894]">
       <div className="flex flex-col items-center justify-between w-11/12 max-w-maxContent text-white leading-6 py-14">
        <div className="border-b w-[100%] flex flex-col lg:flex-row border-black">
           {/* {section 1} */}
           <div className="lg:w-[50%] flex flex-wrap flex-col justify-between">
            {/* <logo> */}
             <div className="flex flex-row">
                <img
                               src={Study_Logo}
                               alt=""
                               className= "ml-9 h-9 w-9"
                            ></img>
                  <p className=" text-white text-4xl  ">tudynotion</p>
                 
                            
             </div>
           
             
           </div>
        </div>
     </div>                                           

      </div>
   )                                                
}

export default FooterLinks