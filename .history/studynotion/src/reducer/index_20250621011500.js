import {combineReducers} from "@reduxjs/toolkit";

import authReducer from "."

const rootReducer = combineReducers({
    auth : authReducer
})

export default rootReducer