import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import customerService from './customerService'

//Handle Api Asynchronous Logic and Data Fetching
export const getUsers = createAsyncThunk('customer/get-customers', async (thunkAPI) => {
    try {
        return await customerService.getUsers()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const initialState = {
    customers: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

// Create Slice: create case 'action and reducer'
export const customerSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isSuccess = true
                state.customers = action.payload
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isSuccess = false
                state.message = action.error
            })
    }
})

// export const { logout } = customerSlice.actions // dung cho reducers
export default customerSlice.reducer
