import React from "react"
import ContactUsForm from "../components/ContactPage/ContactUsForm"
import Extrpage from "../components/ContactPage/Extrapage"
import HighlightText from "../components/core/HomePage/HighlightText"
import FooterLinks2 from "../components/FooterLink2" 


const Contactus = ()=>{
     return(
        <div className="min-h-screen bg-gray-900 text-white py-20">
               {/* Header Section */}
               <div className="mx-auto w-11/12 max-w-7xl">
                    <div className="text-center mb-16">
                         <h1 className="text-5xl font-bold mb-4">
                              Get in <HighlightText text="Touch With Us" />
                         </h1>
                         <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                              Have questions or ideas to share? We'd love to hear from you. Reach out and let's start a conversation!
                         </p>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                         {/* Left Side - Contact Information */}
                         <div className="space-y-8">
                              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700 hover:border-yellow-500 transition">
                                   <Extrpage />
                              </div>
                         </div>

                         {/* Right Side - Contact Form */}
                         <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700 hover:border-yellow-500 transition">
                              <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
                              <form className="space-y-4">
                                   <ContactUsForm />
                              </form>
                         </div>
                    </div>

                    {/* Reviews Section */}
                    <section className="mt-20 pt-20 border-t border-gray-700">
                         <div className="text-center mb-12">
                              <h2 className="text-4xl font-bold mb-4">
                                   <HighlightText text="Success Stories" /> from Our Community
                              </h2>
                              <p className="text-gray-300 text-lg">See what learners have to say about their experience with StudyNotion</p>
                         </div>
                         
                         {/* Placeholder for testimonials */}
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                              {[1, 2, 3].map((item) => (
                                   <div key={item} className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-yellow-500 transition">
                                        <div className="flex items-center gap-4 mb-4">
                                             <div className="w-12 h-12 bg-yellow-500 rounded-full"></div>
                                             <div>
                                                  <p className="font-semibold">Learner {item}</p>
                                                  <p className="text-gray-400 text-sm">Student</p>
                                             </div>
                                        </div>
                                        <p className="text-gray-300 italic">"This course changed my career path. Highly recommended!"</p>
                                   </div>
                              ))}
                         </div>
                    </section>
               </div>
               
               <FooterLinks2/>
        </div>                                  
     )
}

export default Contactus

