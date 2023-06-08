import { IUser } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
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
        userData: builder.query<IUser, void>({
            query: () => "/auth/me",
        }),
    }),
});

export const { useUserDataQuery } = authApi;
