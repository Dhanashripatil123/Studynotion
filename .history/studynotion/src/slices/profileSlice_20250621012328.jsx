import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  

const authslice = createSlice({
     name:"auth",
     initialState: initialState,
     reducers: {
          setToken(state,value){
             state.token = value.payload;                                     
          }                                        
     }                                            
})

export const {setToken} = authslice.actions;
export default authslice.reducer