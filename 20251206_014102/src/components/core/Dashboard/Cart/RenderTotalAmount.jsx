import React from 'react'
import { useSelector } from 'react-redux'

const RenderTotalAmount = () => {

   const {total} = useSelector((state)=>state.auth);   
   
   const handleBuyCourse = () => {
       const courses = cart.map((course) => course._id)
       console.log("bought these courses:",courses);
       //ToDO:API integrate -> payment gateway tak leke jayegi
   }
  return(
     <div>
      
     <p>Total:</p>
     <p>Rs {total}</p>

     <IconBtn
      text="Buy Now" 
      onclick={handleBuyCourse}
      customCliasses={"w-full justify-center"}
     ></IconBtn>

     </div>                                             
  )
}

export default RenderTotalAmount