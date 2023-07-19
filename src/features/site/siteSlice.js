import {createAction ,createAsyncThunk, createSlice} from '@reduxjs/toolkit';

//import {message} from '@/services/message.service';
import siteService from "@/services/site.service.js";

//const user = JSON.parse(localStorage.getItem("user"));

 export const sitesTech = createAsyncThunk(
  'sites/sitesTech',
  async (_,thunkAPI) => {
    try {
      const data = await siteService.sites();
      const me={ sites: data };
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

const initialState = { sites: [] };

  export const sitesSlice = createSlice({
  name: 'sites',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(sitesTech.pending,(state) => {
        console.log("loading"); 
        state.loading = true ;
       })
      .addCase(sitesTech.fulfilled, (state, action) => {
        console.log("action");
        state.sites = action.payload.sites;
        console.log('State:', state.sites);
        state.loading= false;

      });
     // [homeMessages.fulfilled]: (state, action) => {
     //   state.message = action.payload.messages;
     // },

}
});
export const selectSites = (state) => state.sites.sites;
export const selectSitesLoad= (state) => state.sites.loading;
export default  sitesSlice.reducer;
