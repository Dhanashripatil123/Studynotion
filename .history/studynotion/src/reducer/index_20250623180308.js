import {combineReducers} from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import profil

const rootReducer = combineReducers({
    auth : authReducer,
    profile:profileReducer,
    cart:cartReducer
})

export default rootReducer