import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false
}

const authSlice = createSlice( {
    name: "authSlice",
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.user = action.payload.user,
            state.isAuthenticated = true
        },
        userLoggedOut: (state) => {
            state.user = null,
            state.isAuthenticated = false;
        }
    }
})

export const {userLoggedIn, userLoggedOut} = authSlice.actions;
export default authSlice.reducer;


// Sure! I’ll explain this `authSlice.js` file line by line as if you have zero knowledge about Redux and how it works.

// ---

// ### **What Does This File Do?**
// This file creates a **Redux slice** (a state management unit) using `@reduxjs/toolkit`. It helps track **user authentication** status, such as:
// ✅ **Storing user data** after login  
// ✅ **Marking authentication as true/false**  
// ✅ **Logging out a user**  

// ---

// ### **Step 1: Import Required Dependency**
// ```javascript
// import { createSlice } from "@reduxjs/toolkit";
// ```
// - `createSlice`: A helper function from Redux Toolkit that simplifies creating and managing Redux state.
// - Instead of writing long **reducers** and **actions** manually, `createSlice` does it automatically.

// ---

// ### **Step 2: Define the Initial State**
// ```javascript
// const initialState = {
//     user: null,
//     isAuthenticated: false
// };
// ```
// This defines the **default state** when the app starts:
// - `user: null` → No user is logged in initially.
// - `isAuthenticated: false` → The user is not authenticated.

// ---

// ### **Step 3: Create the Authentication Slice**
// ```javascript
// const authSlice = createSlice({
//     name: "authSlice",
//     initialState,
//     reducers: {
// ```
// - `createSlice({})`: Creates a Redux **slice** (a piece of global state).
// - `name: "authSlice"` → The slice is named `"authSlice"`, which is used in Redux DevTools for debugging.
// - `initialState`: The slice starts with the values we defined earlier.
// - `reducers: {}` → This is where we define **actions** (functions to update the state).

// ---

// ### **Step 4: Define the `userLoggedIn` Action**
// ```javascript
// userLoggedIn: (state, action) => {
//     state.user = action.payload.user,
//     state.isAuthenticated = true;
// },
// ```
// - **When this action is dispatched**, it means a user has successfully logged in.
// - `state.user = action.payload.user`: Saves the logged-in user's data in the Redux store.
// - `state.isAuthenticated = true`: Marks the user as authenticated.

// ---

// ### **Step 5: Define the `userLoggedOut` Action**
// ```javascript
// userLoggedOut: (state) => {
//     state.user = null,
//     state.isAuthenticated = false;
// },
// ```
// - **When this action is dispatched**, it logs out the user.
// - `state.user = null`: Clears user data from Redux.
// - `state.isAuthenticated = false`: Marks the user as logged out.

// ---

// ### **Step 6: Export Actions & Reducer**
// ```javascript
// export const { userLoggedIn, userLoggedOut } = authSlice.actions;
// export default authSlice.reducer;
// ```
// - `export const { userLoggedIn, userLoggedOut }`:
//   - Makes the actions (`userLoggedIn`, `userLoggedOut`) available to **dispatch** in other files.
// - `export default authSlice.reducer`:
//   - The reducer function is exported so Redux can use it in the store.

// ---

// ### **Final Thoughts**
// ✅ **`userLoggedIn()`** → Updates Redux state when a user logs in  
// ✅ **`userLoggedOut()`** → Clears the Redux state when a user logs out  
// ✅ **Global state management** → Keeps authentication state available throughout the app  

// This file will be used in **Redux Store** and other components to manage authentication.

// Would you like me to explain how this connects to your frontend? 😊