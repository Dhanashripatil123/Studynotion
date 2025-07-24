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
          setUser: (state, action) => {
               state.user = action.payload;
          },                                       
     },                                            
})

export const {setLoading,setToken,setUser} = authslice.actions;
export default authslice.reducer