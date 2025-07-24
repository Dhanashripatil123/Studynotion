import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem('token')) : null                                             
};

const authslice = createSlice({
     name:"auth",
     initialState: initialState,
     reducers: {
          setLoading: (state, action) => {
               state.loading = action.payload;
          },
          setToken(state,value){
             state.token = value.payload;                                     
          },                                        
     },                                            
})

export const {setToken} = authslice.actions;
export default authslice.reducer