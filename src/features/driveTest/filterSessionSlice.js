

import {createAction ,createAsyncThunk, createSlice} from '@reduxjs/toolkit';

//import {message} from '@/services/message.service';
import driveTestService from "@/services/drivetest.service.js";

//const user = JSON.parse(localStorage.getItem("user"));

 export const filteredSession = createAsyncThunk(
  'filtleredsession/filteredSession',
  async (group_id,technician_id,thunkAPI) => {
    try {
      const data = await driveTestService.dtSessionsFiltered(group_id,technician_id);
      const me={ filteredsession: data };
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

const initialState = { filteredsession: [] };

  export const filteredSessionSlice = createSlice({
  name: 'filteredsession',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(filteredSession.pending,(state) => {
        console.log("loading"); 
        state.loading = true ;
       })
      .addCase(filteredSession.fulfilled, (state, action) => {
        console.log("action");
        state.filteredsession = action.payload.filteredsession;
        console.log('State filtered:', state.filteredsession);
        state.loading= false;
        console.log(state.loading);

      });
     // [homeMessages.fulfilled]: (state, action) => {
     //   state.message = action.payload.messages;
     // },
}
});
export const selectFilteredSession = (state) => state.filteredsession.filteredsession;
export const selectFilteredSessionLoad = (state) => state.filteredsession.loading;
export default  filteredSessionSlice.reducer;
