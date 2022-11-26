import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import Api from '../../Config/api'
import {toast} from 'react-toastify'

export const getAllFirms = createAsyncThunk('dashboard/getAllFirms', async (id, {rejectWithValue}) => {
    try {
        const {data} = await Api.get(`/firms/${id}`)
        return data
    } catch (message) {
        return rejectWithValue(message)
    }
})

export const deleteSingleFirm = createAsyncThunk('dashboard/deleteFirm', async ({id, user}, {rejectWithValue}) => {
    try {
        const {data} = await Api.delete(`/firms/${id}`, {data: {user}})
        return data
    } catch (message) {
        return rejectWithValue(message)
    }
})

export const editFirm = createAsyncThunk('dashboard/editFirm', async (obj, {rejectWithValue}) => {
    try {
        const {data} = await Api.put(`/firms/${obj._id}`, obj)
        return data
    } catch (message) {
        return rejectWithValue(message)
    }
})

export const createFirm = createAsyncThunk('dashboard/createFirm', async (obj, {rejectWithValue}) => {
    try {
        const {data} = await Api.post('/firms', obj)
        return data
    } catch (message) {
        return rejectWithValue(message)
    }
})

const dashboardSlice = createSlice({
    name: 'firms',
    initialState: {
        firms: [],
        count: 0,
        loading: true,
        error: null,
        incomes: 0,
        outcomes: 0,
        total: 0
    },
    reducers: {},
    extraReducers: {
        [getAllFirms.pending]: (state) => {
            state.loading = true
        },
        [getAllFirms.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.firms = payload.data
            state.count = payload.count
            state.incomes = payload.incomes
            state.outcomes = payload.outcomes
            state.total = payload.all
        },
        [getAllFirms.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
            toast.error(payload, {
                autoClose: 1000,
                theme: 'colored'
            })
        },
        [deleteSingleFirm.pending]: (state) => {
            state.loading = true
        },
        [deleteSingleFirm.fulfilled]: (state, {payload}) => {
            console.log(payload)
            state.loading = false
            state.firms = state.firms.filter(firm => firm._id !== payload.data)
            state.count = state.count - 1
            state.incomes = payload.incomes
            state.outcomes = payload.outcomes
            state.total = payload.all
        },
        [deleteSingleFirm.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
            toast.error(payload, {
                autoClose: 1000,
                theme: 'colored'
            })
        },
        [editFirm.pending]: (state) => {
            state.loading = true
        },
        [editFirm.fulfilled]: (state, {payload: {data}}) => {
            state.loading = false
            state.firms = state.firms.map(firm => firm._id === data._id ? data : firm)
        },
        [editFirm.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload.data
            toast.error(payload, {
                autoClose: 1000,
                theme: 'colored'
            })
        },
        [createFirm.pending]: (state) => {
            state.loading = true
        },
        [createFirm.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.firms.push(payload.data)
            state.count = state.count + 1
        },
        [createFirm.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
            toast.error(payload, {
                autoClose: 1000,
                theme: 'colored'
            })
        }
    }
})

export default dashboardSlice.reducer