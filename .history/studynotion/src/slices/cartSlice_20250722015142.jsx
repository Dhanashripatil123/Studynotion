import { createSlice } from "@reduxjs/toolkit";
//import { toast } from "react-hot-toast";


const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")):0                                        
};

const cartslice = createSlice({
     name:"cart",
     initialState: initialState,
     reducers: {
          setTotalItems(state,value){
             state.totalItems = value.payload;                                     
          },
          resetCart(){
               
          }
          //add to Cart
          //remove from Cart
          //resetCart                                        
     }                                            
})

export const {setTotalItems} = cartslice.actions;
export default cartslice.reducer