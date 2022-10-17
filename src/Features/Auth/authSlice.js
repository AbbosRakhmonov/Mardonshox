import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'
import Api from '../../Config/api'
import {toast} from 'react-toastify'

export const signIn = createAsyncThunk('auth/signIn', async (obj, {rejectWithValue}) => {
    try {
        const {data} = await Api.post('/auth/login', obj)
        return data
    } catch (message) {
        return rejectWithValue(message)
    }
})

// export const register = createAsyncThunk('auth/register', async (obj, {rejectWithValue}) => {
//     try {
//         const res = await Api.post('/auth/register', obj)
//     } catch (e) {
//         return rejectWithValue(e)
//     }
// })

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogged: false,
        user: null,
        error: null,
        loading: false
    },
    reducers: {
        logOut: (state, {payload}) => {
            state.user = null
            state.isLogged = false
            localStorage.removeItem('token')
            toast.error(payload, {
                autoClose: 1500,
                theme: 'colored'
            })
        },
        logIn: (state, {payload}) => {
            state.isLogged = true
            state.user = jwtDecode(payload)
        }
    },
    extraReducers: {
        [signIn.pending]: (state) => {
            state.loading = true
        },
        [signIn.fulfilled]: (state, {payload: {token}}) => {
            state.loading = false
            state.isLogged = true
            state.user = jwtDecode(token)
            localStorage.setItem('token', token)
        },
        [signIn.rejected]: (state, {payload}) => {
            state.loading = false
            state.error = payload
            toast.error(payload, {
                autoClose: 1500,
                theme: 'colored'
            })
        }
    }
})

export const {logOut, logIn} = authSlice.actions

export default authSlice.reducer