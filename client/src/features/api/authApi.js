import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../authSlice.js";

const USER_API = `${import.meta.env.VITE_API_BASE_URL}/user/`;


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "register",
        method: "POST",
        body: inputData,
        headers: { "Content-Type": "application/json" }, 
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
        headers: { "Content-Type": "application/json" },
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
      }), 
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          // const result = await queryFulfilled;
          dispatch(userLoggedOut());
        } catch (error) {
          console.log(error);
        }
      }
    }),
    loadUser: builder.query({
      query: () => ({
        url: "profile",
        method: "GET",
      }), async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.log(error);
        }
      }
    }),
    updateuser: builder.mutation({
      query: (formData) => ({
        url: "profile/update",
        method: "PUT",
        body: formData,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useLoadUserQuery,
  useUpdateuserMutation,
} = authApi;
