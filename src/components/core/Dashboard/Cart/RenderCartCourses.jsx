import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdOutlineStar } from "react-icons/md";
import { MdOutlineStarBorder } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { removfromCart } from '../../../../slices/cartSlice';

export const RenderCartCourses = () => {
   const {cart = []} = useSelector((state)=>state.cart || {})
   const dispatch = useDispatch()
   const getAvg = (c) => {
      const arr = c?.ratingAndReview || c?.reviews || c?.ratings || [];
      if (Array.isArray(arr) && arr.length) {
         const sum = arr.reduce((s, r) => s + (r?.rating || r?.value || 0), 0);
         return sum / arr.length;
      }
      return Number(c?.avgRating || c?.averageRating || 0);
   }

   return(
      <div className="space-y-4">
       {
          cart.map((course,index) => {
             const rating = getAvg(course) || 0;
             const rounded = Math.round(rating);
             return (
               <div key={course._id || index} className="bg-[#071226] p-4 rounded-lg flex items-center gap-4">
                  <img src={course?.thumbnail || 'https://via.placeholder.com/160x90'} alt={course?.courseName} className="w-36 h-20 object-cover rounded" />
                  <div className="flex-1">
                       <p className="font-semibold">{course?.courseName}</p>
                       <p className="text-sm text-gray-400">{course?.category?.name}</p>
                       <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-0.5">
                            {Array.from({length:5}).map((_,i) => i < rounded ? <MdOutlineStar key={i} className="text-yellow-400"/> : <MdOutlineStarBorder key={i} className="text-gray-500"/>)}
                          </div>
                          <span className="text-sm text-gray-400">{(course?.ratingAndReview || []).length} Ratings</span>
                       </div>
                  </div>
                  <div className="text-right">
                     <button onClick={() => dispatch(removfromCart(course._id))} className="text-red-400 mb-2"> <RiDeleteBin5Line/> Remove</button>
                     <div className="font-semibold">₹{course?.price}</div>
                  </div>
              </div>
            )
          })
       }
      </div>
   )
}