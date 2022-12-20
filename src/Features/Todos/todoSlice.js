import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import Api from '../../Config/api'
import {toast} from 'react-toastify'

const filterByDate = (todos) => todos.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

export const getReports = createAsyncThunk(
    'reports/getReports',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await Api.get(`/reports/${id}`)
            return data
        } catch (message) {
            return rejectWithValue(message)
        }
    }
)

export const createReport = createAsyncThunk(
    'reports/createReport',
    async (obj, {rejectWithValue}) => {
        try {
            const {data} = await Api.post('/reports', obj)
            return data
        } catch (message) {
            return rejectWithValue(message)
        }
    }
)

export const updateReport = createAsyncThunk(
    'reports/updateReport',
    async (obj, {rejectWithValue}) => {
        try {
            const {data} = await Api.put(`/reports/${obj._id}`, obj)
            return data
        } catch (message) {
            return rejectWithValue(message)
        }
    }
)

export const deleteReport = createAsyncThunk(
    'reports/deleteReport',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await Api.delete(`/reports/${id}`)
            return data
        } catch (message) {
            return rejectWithValue(message)
        }
    }
)

const todoSlice = createSlice({
    name: 'report',
    initialState: {
        reports: [],
        firmName: '',
        count: 0,
        loading: true,
        error: null
    },
    reducers: {},
    extraReducers: {
        [getReports.pending]: (state) => {
            state.loading = true
        },
        [getReports.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.reports = filterByDate(payload.data)
            state.firmName = payload.firmName
            state.count = payload.count
        },
        [getReports.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
            toast.error(payload, {
                autoClose: 1000,
                theme: 'colored'
            })
        },
        [createReport.pending]: (state) => {
            state.loading = true
        },
        [createReport.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.reports = filterByDate([...state.reports, payload.data])
            state.count = state.count + 1
        },
        [createReport.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
            toast.error(payload, {
                autoClose: 1000,
                theme: 'colored'
            })
        },
        [updateReport.pending]: (state) => {
            state.loading = true
        },
        [updateReport.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.reports = filterByDate(state.reports.map(item => item._id === payload.data._id ? payload.data : item))
        },
        [updateReport.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
            toast.error(payload, {
                autoClose: 1000,
                theme: 'colored'
            })
        },
        [deleteReport.pending]: (state) => {
            state.loading = true
        },
        [deleteReport.fulfilled]: (state, {payload}) => {
            state.loading = false
            state.reports = filterByDate(state.reports.filter(item => item._id !== payload.data))
            state.count = state.count - 1
        },
        [deleteReport.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
            toast.error(payload, {
                autoClose: 1000,
                theme: 'colored'
            })
        }
    }
})

export default todoSlice.reducer