import { configureStore } from '@reduxjs/toolkit';
import { firstDataReducer } from './firstData'

export default configureStore({
    devTools: process.env.NODE_ENV !== "production",
    reducer: {
        firstData: firstDataReducer
    },
})