import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authServices'

const getUserfromLocalStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null

// State khởi tạo của user
const initialState = {
    user: getUserfromLocalStorage,
    orders: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

// Tạo async action gọi Api với createAsyncThunk
export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try {
        return await authService.login(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getOrders = createAsyncThunk('order/get-orders', async (thunkAPI) => {
    try {
        return await authService.getOrders()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getOrderByUser = createAsyncThunk('order/get-order', async (id, thunkAPI) => {
    try {
        return await authService.getOrder(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

// Slice: làm việc với state cục bộ và xử lý api asynchronous
export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {}, // xử ký state cục bộ kh có asynchronous
    // làm việc với asynchronous
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
                state.message = 'success'
            })
            .addCase(login.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.message = action.error
                state.isLoading = false
            })
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false
                state.isSuccess = true
                state.orders = action.payload
                state.message = 'success'
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.message = action.error
                state.isLoading = false
            })
            .addCase(getOrderByUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getOrderByUser.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false
                state.isSuccess = true
                state.orderbyuser = action.payload
                state.message = 'success'
            })
            .addCase(getOrderByUser.rejected, (state, action) => {
                state.isError = true
                state.isSuccess = false
                state.message = action.error
                state.isLoading = false
            })
    }
})

export default authSlice.reducer
