import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineStar } from "react-icons/md";
import { MdOutlineStarBorder } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

export const RenderCartCourses = () => {
   
   const {cart} = useSelector((state)=>state.cart)
   const dispatch = useDispatch()                                               
   return(
      <div>
       {
          cart.map((course,index)=>{
              <div>
                  <div>
                       <img src={course?.thumbnail}></img>  
                       <div>
                            <p>{course?.courseName}</p>                      
                            <p>{course?.category?.name}</p>                      
                            <div>
                               <span>4.8</span> 
                               <ReactStars 
                               count={5}
                               size={20}
                               edit={false}
                               activate="#ffd700"
                               emptyIcon={<MdOutlineStarBorder />}
                               fullIcon={<MdOutlineStar />}
                               ></ReactStars> 

                               <span>{course?.ratingAndReview?.length} Rating</span>                 
                             </div> 

                      </div> 
                      <button onClick={()=>dispatch(removfromCart(course._id))}>                          
                         <RiDeleteBin5Line/>
                        <span>Remove</span>
                     </button> 

                     <p>Rs {course?.price}</p>                       
                   </div>                                
              </div>                                    
          })                                        
       }
      </div>                                            
   )
}