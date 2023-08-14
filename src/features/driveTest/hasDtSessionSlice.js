

import {createAction ,createAsyncThunk, createSlice} from '@reduxjs/toolkit';

//import {message} from '@/services/message.service';
import driveTestService from "@/services/drivetest.service.js";

//const user = JSON.parse(localStorage.getItem("user"));

 export const hasDtSessions = createAsyncThunk(
  'hasdtsession/hasDtSessions',
  async (siteid,thunkAPI) => {
    try {
      const data = await driveTestService.siteHasSession(siteid);
      const me={ hasdtsession: data };
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

const initialState = { dtsession: [] };

  export const hasDtSessionsSlice = createSlice({
  name: 'hasdtsession',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(hasDtSessions.pending,(state) => {
        console.log("loading"); 
        state.loading = true ;
       })
      .addCase(hasDtSessions.fulfilled, (state, action) => {
        console.log("action");
        state.hasdtsession = action.payload.hasdtsession;
        console.log('State:', state.hasdtsession);
        state.loading= false;
        console.log(state.loading);

      });
     // [homeMessages.fulfilled]: (state, action) => {
     //   state.message = action.payload.messages;
     // },

}
});
export const selectHasDtSessions = (state) => state.hasdtsession.hasdtsession;
export const selectHasDtSessionsLoad = (state) => state.hasdtsession.loading;
export default  hasDtSessionsSlice.reducer;
