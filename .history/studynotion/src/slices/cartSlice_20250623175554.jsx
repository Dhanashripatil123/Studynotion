import { createSlice } from "@reduxjs/toolkit";
import { toaster } from "react-hot-toast";


const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")):0                                        
};

const cartslice = createSlice({
     name:"auth",
     initialState: initialState,
     reducers: {
          setTotalItems(state,value){
             state.token = value.payload;                                     
          },
          //add to Cart
          //remove from Cart
          //resetCart                                        
     }                                            
})

export const {setTotalItems} = cartslice.actions;
export default cartslice.reducer