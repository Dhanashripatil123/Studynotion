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
               resetCart: (state) => {
                    state.cart = [];
                    state.total = 0;
                    state.totalItems = 0;
                    try { localStorage.removeItem('cart'); localStorage.removeItem('total'); localStorage.removeItem('totalItems'); } catch (e) {}
               },
               addToCart: (state, action) => {
                    const course = action.payload
                    const index = state.cart.findIndex((item) => item._id == course._id)

                    if (index >= 0) {
                         toast.error("Course already in cart")
                         return
                    }

                    state.cart.push(course)
                    state.totalItems = (state.totalItems || 0) + 1
                    const price = Number(course?.price || 0)
                    state.total = (Number(state.total) || 0) + price
                    try {
                         localStorage.setItem('cart', JSON.stringify(state.cart))
                         localStorage.setItem('total', JSON.stringify(state.total))
                         localStorage.setItem('totalItems', JSON.stringify(state.totalItems))
                    } catch (e) {
                         console.warn('Failed to persist cart to localStorage', e)
                    }
               },
               removfromCart: (state, action) => {
                    const id = action.payload
                    const idx = state.cart.findIndex((c) => c._id == id)
                    if (idx >= 0) {
                         const item = state.cart.splice(idx, 1)[0]
                         state.totalItems = Math.max(0, (state.totalItems || 0) - 1)
                         state.total = Math.max(0, (Number(state.total) || 0) - Number(item?.price || 0))
                         try {
                              localStorage.setItem('cart', JSON.stringify(state.cart))
                              localStorage.setItem('total', JSON.stringify(state.total))
                              localStorage.setItem('totalItems', JSON.stringify(state.totalItems))
                         } catch (e) {
                              console.warn('Failed to persist cart to localStorage', e)
                         }
                    }
               },
     },
})

export const {addToCart,resetCart,removfromCart} = cartSlice.actions;
export default cartSlice.reducer;
