import { configureStore } from '@reduxjs/toolkit';
import portfolioReducer from './redux/portfolioData.js';

const store = configureStore({
    reducer: {
        portfolio: portfolioReducer,
    },
});

export default store;
