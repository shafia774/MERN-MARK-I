import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apliSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (buiilder) => ({
        getProducts: buiilder.query({
            query: () => ({
                url: PRODUCTS_URL,
            }),
            keepUnusedDataFor:5
        })
    }),
});

export const {useGetProductsQuery} =productApiSlice;