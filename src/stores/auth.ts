import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

interface AuthState {
    user?: User
}

const initialState: AuthState = {}

const name = 'auth'

export const { reducer: authReducer } = createSlice({
    name,
    initialState,
    reducers: {}
})

export const useAuth = () => useSelector((store: { auth: AuthState }) => store.auth)