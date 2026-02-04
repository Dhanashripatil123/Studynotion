import { createSlice } from "@reduxjs/toolkit";


// const initialState = {
//      token: localStorage.getItem("token")
//           ? JSON.parse(localStorage.getItem("token"))
//           : null,
//      loading: false,
//      user: null,
//      signupData: null, // ✅ Add this line
// };

const initialState = {
     token: localStorage.getItem("token") || null,
     user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
     loading: false,
     signupData:null
};

const authSlice = createSlice({
     name: "auth",
     initialState,
     reducers: {
          setToken: (state, action) => {
               state.token = action.payload;
          },
          setUser: (state, action) => {
               state.user = action.payload;
          },
          setLoading: (state, action) => {
               state.loading = action.payload;
          },
          setSignupData(state, action) {
               state.signupData = action.payload;
          },
          setLoginData(state, action) {
               state.signupData = action.payload;
          },
          logout: (state) => {
               state.token = null;
               state.user = null;
               localStorage.removeItem("token");
               localStorage.removeItem("user");
          },
     },
});

export const { setToken, setUser, setLoading, logout, setSignupData, setLoginData } = authSlice.actions;
export default authSlice.reducer;
