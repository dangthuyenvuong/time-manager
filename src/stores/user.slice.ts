import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { call, put, takeLatest } from "redux-saga/effects";
import { userService } from "services/user.service";
import { getToken, getUser, setUser } from "utils/token";
import { StoreType } from ".";

export type AuthState = {
    user?: User
}

const initialState: AuthState = {
    user: getUser()
}

const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        setUser(state: AuthState, action: PayloadAction<User>) {
            state.user = action.payload
        },
        clearUser(state: AuthState) {
            state.user = undefined
        },
    }
})

export const { actions: userActions, reducer: userReducer } = userSlice


export const fetchUser = createAction(`${userSlice.name}/fetchUser`)

function* fetchLogin(): any {
    try {
        if (getToken()) {
            const res: any = yield call(userService.getProfile)
            if (res.data) {
                setUser(res.data)
                yield put(userActions.setUser(res.data))
            }
        }

    } catch (err) { }
}

export function* userSaga() {
    yield takeLatest(fetchUser, fetchLogin)
}