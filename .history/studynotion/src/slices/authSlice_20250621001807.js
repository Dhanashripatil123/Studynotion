import {createSlice} from "@reduxjs/toolkit"

exports const initialState = {
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem('token')) : null                                             
}