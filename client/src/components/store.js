import { configureStore } from "@reduxjs/toolkit";
import  loginInfoSlice  from "./reduxFeatures/loginInfoSlice";
import notificationSlice  from "./reduxFeatures/notificationSlice";

export const store = configureStore({
    reducer: {
        userInfo: loginInfoSlice,
        notification: notificationSlice,
    },
});
