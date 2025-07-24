import {createSlice} from "@reduxjs/toolkit"

const initialState = {
     user:null,                                              
};

const profileslice = createSlice({
     name:"profile",
     initialState: initialState,
     reducers: {
          setUser(state,value){
             state.user = value.payload;                                     
          }                                        
     }                                            
})

export const {setUser} = profileslice.actions;
export default profileslice.reducer