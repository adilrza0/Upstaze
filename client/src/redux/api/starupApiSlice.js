import { apiSlice } from "../slices/apiSlice";

const STARTUP_URL = "/startup";
const startupApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addStartup: builder.mutation({
      query: ({ data, token }) => ({
        url: `${STARTUP_URL}`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        // credentials: "include",
      }),
    }),
    getmystartUp: builder.query({
      query: ({ token }) => ({
        url: `${STARTUP_URL}/my-startups`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        // credentials: "include",
      }),
    }),
    getAllStartUp: builder.query({
      query: ({ token }) => ({
        url: `${STARTUP_URL}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        // credentials: "include",
      }),
    }),
    getStartUpbyId: builder.query({
      query: ({ id, token }) => ({
        url: `${STARTUP_URL}/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        // credentials: "include",
      }),
    }),
    findStartups: builder.mutation({
      query: ({ data, token }) => ({
        url: `${STARTUP_URL}/find-startups`,
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        // credentials: "include",
      }),
    }),
  }),
});

export const {
  useAddStartupMutation,
  useGetStartUpbyIdQuery,
  useGetmystartUpQuery,
  useGetAllStartUpQuery,
  useLazyGetAllStartUpQuery,
  useFindStartupsMutation
} = startupApiSlice;
