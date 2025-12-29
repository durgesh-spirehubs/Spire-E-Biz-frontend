// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import axios from '@/lib/axios';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState :any = {
    error: null,
    customers: [],
    orders: [],
    products: [],
    productreviews: []
};

const slice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },

        // GET CUSTOMERS
        getCustomersSuccess(state, action) {
            state.customers = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getCustomers() {
    return async () => {
        try {
            const response = await axios.get('/customers');
            dispatch(slice.actions.getCustomersSuccess(response.data.data.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
