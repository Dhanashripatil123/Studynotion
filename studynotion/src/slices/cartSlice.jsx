import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-hot-toast"

const initialState = {
     cart: localStorage.getItem("cart")
          ? JSON.parse(localStorage.getItem("cart"))
          : [],
     total: localStorage.getItem("total")
          ? JSON.parse(localStorage.getItem("total"))
          : 0,
     totalItems: localStorage.getItem("totalItems")
          ? JSON.parse(localStorage.getItem("totalItems"))
          : 0,
}

const cartSlice = createSlice({
     name: "cart",
     initialState,
     reducers: {
          resetCart:()=>{

          },
          addToCart: (state, action) => {
               const course = action.payload
               const index = state.cart.findIndex((item) => item._id == course._id)

               if (index >= 0) {
                    // If the course is already in the cart, do not modify the quantity
                    toast.error("Course already in cart")
                    return
               }

               // If the course is not in the cart, add it to the cart
               state.cart.push(course)
               // Update the total quantity and price
               state.totalItems++
          },
     },
})

export const {addToCart,resetCart} = cartSlice.actions;
export default cartSlice.reducer;
