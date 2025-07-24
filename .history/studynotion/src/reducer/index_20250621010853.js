import {combineReducer} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    auth : authReducer
})

export default rootReducer