import { configureStore } from "@reduxjs/toolkit";
import  loginInfoSlice  from "./reduxFeatures/loginInfoSlice";

export const store = configureStore({
    reducer: {
        userInfo: loginInfoSlice,
    },
});
