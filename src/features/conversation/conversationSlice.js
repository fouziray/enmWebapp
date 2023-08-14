import {createAction ,createAsyncThunk, createSlice} from '@reduxjs/toolkit';

//import {message} from '@/services/message.service';
import conversationService from "@/services/conversation.service.js";

//const user = JSON.parse(localStorage.getItem("user"));

 export const conversationDetail = createAsyncThunk(
  'conversation/conversationDetail',
  async (conversation_id,thunkAPI) => {
    try {
      //const conversation_id="1d92da5044554c4882c0624bdbc68f7b";
  
      const data = await conversationService.conversation(conversation_id);
      const response={ conversation : data };
      return response;
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

const initialState = { conversationHistory: [] };

  export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(conversationDetail.pending,(state) => {
        console.log("loading"); 
        state.loading = true ;
       })
      .addCase(conversationDetail.fulfilled, (state, action) => {
        console.log("action");
        state.conversationHistory = action.payload.conversation;
        console.log('State:', action.payload.conversation);
        state.loading = false;
      });
     // [homeMessages.fulfilled]: (state, action) => {
     //   state.message = action.payload.messages;
     // },

}
});
export const selectConversation = (state) => state.conversation.conversationHistory;
export const selectConversationLoading = (state) => state.conversation.loading;

export default  conversationSlice.reducer;
