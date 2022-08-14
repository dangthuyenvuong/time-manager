import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './auth.slice'
import { fetchUser, userReducer } from './user.slice'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './rootSaga'

const saga = createSagaMiddleware()
export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer
    },
    middleware: [saga]
})

saga.run(rootSaga)

store.dispatch(fetchUser())
export type StoreType = ReturnType<typeof store['getState']> 
