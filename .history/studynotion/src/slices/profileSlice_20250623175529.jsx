import {createSlice} from "@reduxjs/toolkit"

const initialState = {
     user:null,                                              
};

const profileslice = createSlice({
     name:"auth",
     initialState: initialState,
     reducers: {
          setToken(state,value){
             state.token = value.payload;                                     
          }                                        
     }                                            
})

export const {setToken} = profileslice.actions;
export default authslice.reducer