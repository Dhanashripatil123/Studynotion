import {CombineReducer} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    auth: authReducer
})

export default rootReducer