import {createAction ,createAsyncThunk, createSlice} from '@reduxjs/toolkit';

//import {message} from '@/services/message.service';
import siteService from "@/services/site.service.js";

//const user = JSON.parse(localStorage.getItem("user"));

 export const sitesTech = createAsyncThunk(
  'sites/sitesTech',
  async (_,thunkAPI) => {
    try {
      const data = await siteService.sites(_);
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

export const getSitesLastSession= createAsyncThunk(
  'sites/getSitesLastSession',
  async (_,thunkAPI) => {
    try {
      const data = await siteService.get_sites_last_session();
      const me={ sites_sessions: data };
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
        state.nextPageUrl=action.payload.sites.next;
        state.previousPageUrl=action.payload.sites.previous;
        state.sites = action.payload.sites.results ? action.payload.sites.results : action.payload.sites;
        console.log('State:', state.sites);
        state.loading= false;
        
      })
      .addCase(getSitesLastSession.pending, (state,action)=>{
        state.sitesSessionsLoading=true
      }).addCase(getSitesLastSession.fulfilled, (state,action)=>{
        state.sitesLastSessions=action.payload.sites_sessions
        state.sitesSessionsLoading=false
      });
     // [homeMessages.fulfilled]: (state, action) => {
     //   state.message = action.payload.messages;
     // },

}
});
export const selectSitesLastSessions= (state) => state.sites.sitesLastSessions;
export const selectSitesLastSessionsLoad=(state)=> state.sites.sitesSessionsLoading;
export const selectSites = (state) => state.sites.sites;
export const selectSitesLoad= (state) => state.sites.loading;
export const selectNextPreviousPageUrl= (state)=>   state.sites.nextPageUrl  ;
export const selectPreviousPageUrl=(state)=>state.sites.previousPageUrl;
export default  sitesSlice.reducer;
