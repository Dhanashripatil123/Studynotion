import {combineReducers} from "@reduxjs/toolkit";

import authReducer from "../Slices/"

const rootReducer = combineReducers({
    auth : authReducer
})

export default rootReducer