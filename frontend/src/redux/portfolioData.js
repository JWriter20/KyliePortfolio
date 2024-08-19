import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define API base URL
const API_URL = '/api/portfolio';

// 1. Fetch portfolio details
export const fetchPortfolioDetails = createAsyncThunk(
    'portfolio/fetchPortfolioDetails',
    async () => {
        const response = await axios.get(API_URL);
        const parsed = response.data.map((item) => {
            return {
                ...item,
                imageUrls: JSON.parse(item.imageUrls),
            };
        });
        return parsed;
    }
);


// 2. Add a new portfolio entry
export const addPortfolioDetail = createAsyncThunk(
    'portfolio/addPortfolioDetail',
    async (newDetail) => {
        const response = await axios.post(API_URL, newDetail);
        return response.data;
    }
);

// 3. Delete a portfolio entry
export const deletePortfolioDetail = createAsyncThunk(
    'portfolio/deletePortfolioDetail',
    async (id) => {
        const response = await axios.delete(`${API_URL}/${id}`);
        return { id };
    }
);

// 3. Delete a portfolio entry
export const updatePortfolioDetail = createAsyncThunk(
    'portfolio/updatePortfolioDetail',
    async ({ id, data }) => {
        const response = await axios.put(`${API_URL}/${id}`, data);
        return { id };
    }
);

// Initial state
const initialState = {
    portfolioDetails: [],
    status: 'idle',
    error: null,
};

// Create the slice
const portfolioSlice = createSlice({
    name: 'portfolio',
    initialState,
    reducers: {
        // Optional: you can define additional reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPortfolioDetails.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPortfolioDetails.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.portfolioDetails = action.payload;
            })
            .addCase(fetchPortfolioDetails.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addPortfolioDetail.fulfilled, (state, action) => {
                state.portfolioDetails.push(action.payload);
            })
            .addCase(deletePortfolioDetail.fulfilled, (state, action) => {
                state.portfolioDetails = state.portfolioDetails.filter(
                    (detail) => detail.id !== action.payload.id
                );
            });
    },
});

// Export the async thunks and the reducer
export default portfolioSlice.reducer;
