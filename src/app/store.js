import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/features/counter/counterSlice';
import userReducer from '@/features/user/userSlice';
import authReducer from "@/features/auth";
import messageReducer from '@/features/message/messageSlice';
import conversationReducer from '@/features/conversation/conversationSlice';
import apiSlice from './api/apiSlice';
import sitesReducer from '@/features/site/siteSlice';
import sitecreationReducer from '@/features/site/siteCreationSlice';
import usersgroupsReducer from '@/features/driveTest/usersPerGroupsSlice';
import dtsessionsReducer from '@/features/driveTest/dtSessionSlice';
import technicianusersReducer from '@/features/driveTest/technicianUsersSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    counter: counterReducer,
    user: userReducer,
    auth: authReducer,
    message: messageReducer,
    conversation: conversationReducer,
    sites: sitesReducer,
    sitecreated: sitecreationReducer,
    usersgroups: usersgroupsReducer,
    dtsession: dtsessionsReducer,
    technicians:technicianusersReducer,
  },
  middleware: (getdefaultMiddleware) =>
    getdefaultMiddleware().concat(apiSlice.middleware),
  devTools: false,
});

export default store;
