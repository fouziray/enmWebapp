

import {createAction ,createAsyncThunk, createSlice} from '@reduxjs/toolkit';

//import {message} from '@/services/message.service';
import driveTestService from "@/services/drivetest.service.js";

//const user = JSON.parse(localStorage.getItem("user"));

 export const dtSessions = createAsyncThunk(
  'dtsession/dtSessions',
  async (_,thunkAPI) => {
    try {
      const data = await driveTestService.dtSessions();
      const me={ dtsession: data };
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

  export const dtsessionsSlice = createSlice({
  name: 'dtsession',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(dtSessions.pending,(state) => {
        console.log("loading"); 
        state.loading = true ;
       })
      .addCase(dtSessions.fulfilled, (state, action) => {
        console.log("action");
        state.dtsession = action.payload.dtsession;
        console.log('State:', state.dtsession);
        state.loading= false;
        console.log(state.loading);

      });
     // [homeMessages.fulfilled]: (state, action) => {
     //   state.message = action.payload.messages;
     // },

}
});
export const selectDtSessions = (state) => state.dtsession.dtsession;
export const selectDtSessionsLoad = (state) => state.dtsession.loading;
export default  dtsessionsSlice.reducer;
