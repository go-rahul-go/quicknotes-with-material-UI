import { configureStore } from "@reduxjs/toolkit";
import noteReducers from "./noteSlice"


const store=configureStore({
    reducer:{
        notes:noteReducers
    }
})


export default store;