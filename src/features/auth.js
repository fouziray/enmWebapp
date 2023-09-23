import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password);
      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      if( action.payload.user.admin || action.payload.user.staff){
      state.isLoggedIn = true;
    }
      state.admin=action.payload.user.admin
      state.user = action.payload.user;
      console.log("user" ,state.user, action.payload.user)
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      console.log("rejected");
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser= (state) => state.auth.user;
export const selectisadmin=(state) => state.auth.admin;
const { reducer } = authSlice;
export default reducer;
