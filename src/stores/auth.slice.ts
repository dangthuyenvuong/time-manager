import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { call, put, putResolve, takeLatest } from "redux-saga/effects";
import { authService } from "services/auth.service";
import { clearToken, clearUser, setToken } from "utils/token";
import { StoreType } from ".";
import { fetchUser, userActions } from "./user.slice";

const initialState = {
    loading: false
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login() { },
        logout() { },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        }
    },
})


export const { actions: authActions, reducer: authReducer } = authSlice

export const useAuth = () => useSelector((store: StoreType) => store.auth)


export const fetchLoginAction = createAction<{username: string, password: string}>(`${authSlice.name}/fetchLogin`)

function* fetchLogin(action: any) : any{
    try{
        yield putResolve(authActions.setLoading(true))
        const res: any = yield call(authService.login, action.payload)
        if(res.data) {
            setToken(res.data)
            yield putResolve(fetchUser())
        }
    }catch(err) {}
    finally{
        yield putResolve(authActions.setLoading(false))
    }
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