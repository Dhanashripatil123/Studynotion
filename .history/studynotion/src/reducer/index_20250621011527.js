import {combineReducers} from "@reduxjs/toolkit";

import authReducer from "../Slices/auth"

const rootReducer = combineReducers({
    auth : authReducer
})

export default rootReducer