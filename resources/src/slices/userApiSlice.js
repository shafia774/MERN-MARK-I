import { USER_URL } from "../constants";
import { apiSlice } from "./apliSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (buiilder) => ({
        login: buiilder.query({
            query: (data) => ({
                url: USER_URL/login,
            }),
            keepUnusedDataFor:5
        })
    }),
});

export const {useLoginMutation, } =userApiSlice;