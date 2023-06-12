import { IProduct } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type IUploadImageResponse = {
    message: string;
    path: string;
};

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api",
        prepareHeaders: (headers, _) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("authorization", token);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<IProduct[], void>({
            query: () => "/products",
        }),
        uploadImage: builder.mutation<IUploadImageResponse, FormData>({
            query: (body) => ({
                url: "/products/upload",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const { useGetProductsQuery, useUploadImageMutation } = productApi;
