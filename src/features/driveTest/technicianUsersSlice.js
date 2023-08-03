

import {createAction ,createAsyncThunk, createSlice} from '@reduxjs/toolkit';

//import {message} from '@/services/message.service';
import driveTestService from "@/services/drivetest.service.js";

//const user = JSON.parse(localStorage.getItem("user"));

 export const technicianUsers = createAsyncThunk(
  'technicians/technicianUsers',
  async (_,thunkAPI) => {
    try {
      const data = await driveTestService.technicianUsers();
      const me={ technicians: data };
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

const initialState = { technicians: [] };

  export const technicianUsersSlice = createSlice({
  name: 'technicians',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(technicianUsers.pending,(state) => {
        console.log("loading"); 
        state.loading = true ;
       })
      .addCase(technicianUsers.fulfilled, (state, action) => {
        console.log("action");
        state.technicians = action.payload.technicians;
        console.log('State:', state.technicians);
        state.loading= false;
        console.log(state.loading);

      });
     // [homeMessages.fulfilled]: (state, action) => {
     //   state.message = action.payload.messages;
     // },

}
});
export const selectTechnicianUsers = (state) => state.technicians.technicians;
export const selectTechnicianUsersLoad = (state) => state.technicians.loading;
export default  technicianUsersSlice.reducer;
