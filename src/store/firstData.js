import { createSlice } from '@reduxjs/toolkit'
import json from '../data/index.json'

export const firstDataSlice = createSlice({
    name: 'firstData',
    initialState: {
        data: json,
    },
    reducers: {
        firstDataAction: (state, action) => {
            state.data = action.payload
        },
    },
})

export const { firstDataAction } = firstDataSlice.actions

export const firstDataReducer = firstDataSlice.reducer