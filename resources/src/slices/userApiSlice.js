import { USER_URL } from "../constants";
import { apiSlice } from "./apliSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (buiilder) => ({
        login: buiilder.mutation({
            query: (data) => ({
                url: `${USER_URL}/login`,
                method: 'POST',
                body: data
            }),
        }),
        register: buiilder.mutation({
            query: (data) => ({
                url: `${USER_URL}/signup`,
                method: 'POST',
                body: data
            }),
        }),
        logout: buiilder.mutation({
            query: (data) => (
                {
                url: `${USER_URL}/logout`,
                method: 'POST',
                headers: {
                    Authorization: data.token ? `Bearer ${data.token}` : '', 
                    },
            }),
        }),
    }),
});

export const {useLoginMutation, useLogoutMutation, useRegisterMutation} = userApiSlice;