import React from "react"
import ContactUsForm from "../components/ContactPage/ContactUsForm"
import Extrpage from "../components/ContactPage/Extrapage"
import HighlightText from "../components/core/Homepage/HighlightText"
import FooterLinks2 from "../components/FooterLink2"
import ReviewSlider from "../components/common/ReviewSlider"


const Contactus = ()=>{
     return(
        <div className="min-h-screen bg-gradient-to-b from-[#061021] to-[#091026] text-white py-20">
               {/* Header Section */}
               <div className="mx-auto w-full max-w-7xl px-4">
                    <div className="text-center mb-8">
                         <h1 className="text-3xl md:text-4xl font-bold mb-2">Have a question?</h1>
                         <p className="text-md md:text-lg text-gray-400 max-w-3xl mx-auto">We're here to help — choose a method or send us a message.</p>
                    </div>

                    {/* Main Content Grid */}
                         <div className="bg-[rgba(7,18,38,0.6)] border border-gray-800 rounded-2xl p-6 mb-20">
                           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                         {/* Left Side - Contact Information (narrow) */}
                         <div className="lg:col-span-1 flex justify-center lg:justify-start">
                              <Extrpage />
                         </div>

                         {/* Right Side - Contact Form (wide) */}
                         <div className="lg:col-span-2 flex justify-center">
                              <div className="bg-[#071226] rounded-xl p-8 border border-gray-800 shadow-lg w-full max-w-3xl">
                                   <div className="mb-6">
                                     <h2 className="text-3xl md:text-4xl font-extrabold text-white">Got a Idea? We've got the skills.</h2>
                                     <div className="text-lg text-gray-300 mt-2">Let's team up</div>
                                     <p className="text-sm text-gray-400 mt-3">Tell us more about yourself and what you've got in mind.</p>
                                   </div>
                                   <ContactUsForm />
                              </div>
                         </div>
                                                                  </div>
                                                             </div>

                    {/* Reviews Section */}
                    <section className="mt-20 pt-20 border-t border-[#0b1724]">
                         <div className="text-center">
                              <h2 className="text-2xl font-semibold text-white">Reviews from other learners</h2>
                         </div>
                    </section>

               </div>
               <div><ReviewSlider></ReviewSlider></div>
               <div className="mt-20">
               <FooterLinks2/>
               </div>
        </div>                                  
     )
}

export default Contactus

