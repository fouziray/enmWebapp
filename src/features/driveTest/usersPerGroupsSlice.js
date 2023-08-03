import {createAction ,createAsyncThunk, createSlice} from '@reduxjs/toolkit';

//import {message} from '@/services/message.service';
import driveTestService from "@/services/drivetest.service.js";

//const user = JSON.parse(localStorage.getItem("user"));

 export const usersPerGroups = createAsyncThunk(
  'usersgroups/usersPerGroups',
  async (_,thunkAPI) => {
    try {
      const data = await driveTestService.usersPerGroups();
      const me={ usersgroups: data };
      return me;
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

const initialState = { usersgroups: [] };

  export const usersgroupsSlice = createSlice({
  name: 'usersgroups',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(usersPerGroups.pending,(state) => {
        console.log("loading"); 
        state.loading = true ;
       })
      .addCase(usersPerGroups.fulfilled, (state, action) => {
        console.log("action");
        state.usersgroups = action.payload.usersgroups;
        console.log('State:', state.usersgroups);
        state.loading= false;
        console.log(state.loading);

      });
     // [homeMessages.fulfilled]: (state, action) => {
     //   state.message = action.payload.messages;
     // },

}
});
export const selectUsersGroups = (state) => state.usersgroups.usersgroups;
export const selectUsersGroupsLoad= (state) => state.usersgroups.loading;
export default  usersgroupsSlice.reducer;
