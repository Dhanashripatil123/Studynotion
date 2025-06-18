import { React } from "react";
import {Footer} from "../../../data/footer-links"
import {Link} from "react-router-dom";

//Images
import{} from ""

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

const Footer = () => {
                                                  
   return(
      <div className="bg-black">
       <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-white leading-6 py-14">
        <div>
                                                  
        </div>
     </div>                                           

      </div>
   )                                                
}

export default Footer