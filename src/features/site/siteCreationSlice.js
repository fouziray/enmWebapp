import {createAction ,createAsyncThunk, createSlice} from '@reduxjs/toolkit';

//import {message} from '@/services/message.service';
import siteService from "@/services/site.service.js";

//const user = JSON.parse(localStorage.getItem("user"));

 export const sitesCreationTech = createAsyncThunk(
  'sitesCreation/sitesCreationTech',
  async (values,thunkAPI) => {
    try {
      const data = await siteService.create_site(values);
      const me={ site: data };
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

const initialState = { site: [] };

  export const siteCreationSlice = createSlice({
  name: 'sitesCreation',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(sitesCreationTech.pending,(state) => {
        console.log("loading"); 
        state.loading = true ;
       })
      .addCase(sitesCreationTech.fulfilled, (state, action) => {
        console.log("action");
        state.sitesCreation = action.payload.site;
        console.log('State:', state.site);
        state.loading= false;

      });
     // [homeMessages.fulfilled]: (state, action) => {
     //   state.message = action.payload.messages;
     // },

}
});
export const selectCreatedSite = (state) => state.site.sitesCreation;
export const selectCreatedSitesLoad= (state) => state.site.loading;
export default  siteCreationSlice.reducer;
