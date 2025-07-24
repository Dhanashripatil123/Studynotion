import {CombineReducer} from "@reduxjs/toolkit";


const rootReducer = combineReducer({
    auth: authReducer
})

export default rootReducer