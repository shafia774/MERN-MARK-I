 import {createSlice} from '@reduxjs/toolkit';
import { json } from 'express';

 const initialState ={
    userInfo: localStorage.getItem('userInfo') ? 
    JSON.parse(localStorage.getItem(userInfo)) : null,
 }

 const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo =action.payload;
            localStorage.setItem('userInfo',
            json.stringify(action.payload));
        }
    }
 }); 

 export const {setCredentials} = authSlice.actions;

 export default authSlice.reducer;