import {configureStore} from '@reduxjs/toolkit';
import { apiSlice } from './slices/apliSlice';
import authSliceReducer from './slices/authSlice';

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath] : apiSlice.reducer,
        cart: authSliceReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(apiSlice.middleware),
    devTools: true, 

});

export default store