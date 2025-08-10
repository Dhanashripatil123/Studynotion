import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

export const ContactFormSection = () => {
    return(
       <div className='mx-auto'>
          <h1>
            Get in Touch                                      
          </h1> 
          <p>
             we'd love to here for you , please fill out thid form                                     
          </p>
          <div>
              <ContactUsForm></ContactUsForm>                                    
          </div>
       </div>                                           
    )                                              
}