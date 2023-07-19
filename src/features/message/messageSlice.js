import {createAction ,createAsyncThunk, createSlice} from '@reduxjs/toolkit';

//import {message} from '@/services/message.service';
import messageService from "@/services/message.service.js";

//const user = JSON.parse(localStorage.getItem("user"));

 export const homeMessages = createAsyncThunk(
  'message/homeMessages',
  async (_,thunkAPI) => {
    try {
      const data = await messageService.messages();
      const me={ messages: data };
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

const initialState = { messaging: [] };

  export const messageSlice = createSlice({
  name: 'message',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(homeMessages.pending,(state) => {
        console.log("loading"); 
        state.loading = true ;
       })
      .addCase(homeMessages.fulfilled, (state, action) => {
        console.log("action");
        state.messaging = action.payload.messages;
        console.log('State:', state.messaging);
        state.loading= false;

      });
     // [homeMessages.fulfilled]: (state, action) => {
     //   state.message = action.payload.messages;
     // },

}
});
export const selectMessage = (state) => state.message.messaging;
export const selectMessageLoad= (state) => state.message.loading;
export default  messageSlice.reducer;
