import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



const baseQuery = fetchBaseQuery({baseUrl:`https://upstaze.com/api`})

export const apiSlice = createApi({
    baseQuery,
    tagTypes:[],
    endpoints:(builder) =>({})
})