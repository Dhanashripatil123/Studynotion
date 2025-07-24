import {combineReducers} from "@reduxjs/toolkit";

import auth

const rootReducer = combineReducers({
    auth : authReducer
})

export default rootReducer