import {combineReducers} from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice"

const rootReducer = combineReducers({
    auth : authReducer,
    profile:profileReducer,
    cart:cartReduceer
})

export default rootReducer