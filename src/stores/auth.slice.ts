import { createAction, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { call, put, takeLatest } from "redux-saga/effects";
import { authService } from "services/auth.service";
import { clearToken, clearUser, setToken } from "utils/token";
import { StoreType } from ".";
import { fetchUser, userActions } from "./user.slice";

const initialState = {}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login() { },
        logout() { },
    },
})


export const { actions: authActions, reducer: authReducer } = authSlice

export const useAuth = () => useSelector((store: StoreType) => store.auth)


export const fetchLoginAction = createAction<{username: string, password: string}>(`${authSlice.name}/fetchLogin`)

function* fetchLogin(action: any) : any{
    try{
        const res: any = yield call(authService.login, action.payload)
        if(res.data) {
            setToken(res.data)
            yield put(fetchUser())
        }
    }catch(err) {}
}

export const logoutAction = createAction(`${authSlice.name}/logout`)

function* logout(){
    try{
        yield put(userActions.clearUser())
        clearToken()
        clearUser()
    }catch(err) {}
}

export function* authSaga() {
    yield takeLatest(fetchLoginAction, fetchLogin)
    yield takeLatest(logoutAction, logout)
}