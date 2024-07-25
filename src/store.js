// src/store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

//created auth slice with initial state and reducer
const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false, user: null, users: [] },
  reducers: {
    //Sets isLoggedIn to true and sets the user data

    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    // Sets isLoggedIn to false and clears the user data
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
  },
});

export const { login, logout, addUser } = authSlice.actions;

// Configure the Redux store with the auth slice reducer
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
