import {combineReducers} from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice";
import cart

const rootReducer = combineReducers({
    auth : authReducer,
    profile:profileReducer,
    cart:cartReducer
})

export default rootReducer