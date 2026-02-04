import React from "react"
import ContactUsForm from "../components/ContactPage/ContactUsForm"
import Extrpage from "../components/ContactPage/Extrapage"
import HighlightText from "../components/core/HomePage/HighlightText"
import FooterLinks2 from "../components/FooterLink2" 


const Contactus = ()=>{
     return(
        <div>
               <div className="flex flex-row gap-[20%]">
                    <div><Extrpage></Extrpage></div>
                    <header className="flex  flex-col gap-5">
                         <h1 className="text-white ">Got a Idea? We've got the skills. Let's team up</h1>

                         <form className="text-white"><ContactUsForm></ContactUsForm></form>
                    </header>
               </div>  

               <section className='mt-5'>
                    <div className="text-white">
                         Reviews from other learners
                    </div>
               </section>
               
               <FooterLinks2></FooterLinks2>

        </div>                                  
     )
}

export default Contactus

