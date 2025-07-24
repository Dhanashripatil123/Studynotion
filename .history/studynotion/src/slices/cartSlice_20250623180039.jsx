import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";


const initialState = {
0                                        
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