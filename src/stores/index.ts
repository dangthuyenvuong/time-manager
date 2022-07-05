import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth";

const store = configureStore({
    reducer: combineReducers({
        auth: authReducer
    }),
    middleware: []
})

export default store