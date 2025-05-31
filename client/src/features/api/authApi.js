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
        headers: { "Content-Type": "application/json" }, // ✅ Ensure correct headers
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

// authApi.js handles login & signup API requests.
// ✅ Uses createApi() from Redux Toolkit Query to manage API calls.
// ✅ registerUser & loginUser endpoints update Redux state on success.
// ✅ useRegisterUserMutation and useLoginUserMutation allow easy integration into React components.
// ✅ store.js registers authApi to enable API calls in Redux.

// authSlice.js → Manages authentication state
// ✅ store.js → Registers authSlice in Redux store
// ✅ main.jsx → Wraps the app with <Provider>
// ✅ useDispatch() & useSelector() → Used in components to modify and read auth state
// ✅ authApi.js → Calls authentication API and updates Redux state

// Sure! I’ll break it down as if you have zero knowledge about Redux Toolkit Query (RTK Query) and how this `authApi` works.

// ---

// ### **Understanding the Code Line by Line**

// This file defines an API slice using Redux Toolkit Query (RTK Query), a powerful tool for handling data fetching in React applications. It helps manage API calls efficiently while reducing boilerplate code.

// ---

// ### **Step 1: Import Required Dependencies**
// ```javascript
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { userLoggedIn } from "../authSlice.js";
// ```
// - `createApi`: This function from RTK Query is used to create an API slice.
// - `fetchBaseQuery`: A simple utility that helps in making API requests, handling headers, and credentials automatically.
// - `userLoggedIn`: An action from `authSlice.js`, used to update the Redux store when a user logs in.

// ---

// ### **Step 2: Define API Base URL**
// ```javascript
// const USER_API = "http://localhost:8080/api/v1/user/";
// ```
// - This defines the base URL where all authentication-related API requests will be sent.
// - **Example:** If a request is made to `"register"`, the final URL will be `http://localhost:8080/api/v1/user/register`.

// ---

// ### **Step 3: Create the API Slice**
// ```javascript
// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: USER_API,
//     credentials: "include",
//   }),
//   endpoints: (builder) => ({
// ```
// - `createApi({})` is used to define an API slice.
// - `reducerPath: "authApi"`: This is the name used in the Redux store to identify this slice.
// - `baseQuery: fetchBaseQuery({})`:
//   - `baseUrl: USER_API`: This ensures all requests are prefixed with `"http://localhost:8080/api/v1/user/"`.
//   - `credentials: "include"`: Ensures cookies (such as authentication tokens) are sent with requests.

// ---

// ### **Step 4: Define the Register User API**
// ```javascript
// registerUser: builder.mutation({
//   query: (inputData) => ({
//     url: "register",
//     method: "POST",
//     body: inputData,
//     headers: { "Content-Type": "application/json" },
//   }),
// ```
// - `registerUser`: This defines a mutation (an API call that modifies data, like registering a new user).
// - `query: (inputData) => ({ ... })`:
//   - `url: "register"`: The request is sent to `http://localhost:8080/api/v1/user/register`.
//   - `method: "POST"`: It sends data to the server.
//   - `body: inputData`: The user registration details (e.g., name, email, password) are sent in the request body.
//   - `headers: { "Content-Type": "application/json" }`: Ensures the request is sent in JSON format.

// ---

// ### **Step 5: Handle the API Response**
// ```javascript
//   async onQueryStarted(arg, { queryFulfilled, dispatch }) {
//     try {
//       const result = await queryFulfilled;
//       dispatch(userLoggedIn({ user: result.data.user }));
//     } catch (error) {
//       console.log(error);
//     }
//   },
// ```
// - `onQueryStarted()`: This function runs when the mutation (API call) is started.
// - `queryFulfilled`: Holds the API response once the request is successful.
// - `dispatch(userLoggedIn({ user: result.data.user }))`:
//   - After successful registration, the user details are stored in Redux (global state) to track the logged-in user.
// - `catch (error)`: If the request fails, the error is logged.

// ---

// ### **Step 6: Define the Login User API**
// ```javascript
// loginUser: builder.mutation({
//   query: (inputData) => ({
//     url: "login",
//     method: "POST",
//     body: inputData,
//     headers: { "Content-Type": "application/json" },
//   }),
// ```
// - Works the same way as `registerUser`, but:
//   - `url: "login"`: Sends a request to `http://localhost:8080/api/v1/user/login`.
//   - The API expects an email and password.

// ---

// ### **Step 7: Handle Login Response**
// ```javascript
//   async onQueryStarted(arg, { queryFulfilled, dispatch }) {
//     try {
//       const result = await queryFulfilled;
//       dispatch(userLoggedIn({ user: result.data.user }));
//     } catch (error) {
//       console.log(error);
//     }
//   },
// ```
// - **If login is successful**: The user data is stored in Redux.
// - **If login fails**: An error is logged.

// ---

// ### **Step 8: Export Hooks for API Calls**
// ```javascript
// export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
// ```
// - `useRegisterUserMutation()`: A custom React hook to trigger the register API call.
// - `useLoginUserMutation()`: A hook to trigger the login API call.

// ---

// ### **Final Thoughts**
// This API slice allows us to:
// ✅ Register a user (`registerUser`)
// ✅ Log in a user (`loginUser`)
// ✅ Automatically update the Redux store with logged-in user data

// Would you like me to explain another part of your project in a similar way? 😊
