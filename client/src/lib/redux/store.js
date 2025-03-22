import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  PERSIST,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import loginInfoSlice from "./features/loginInfoSlice";
import notificationSlice from "./features/notificationSlice";
import friendRequestDetailsSlice from "./features/friendRequestDetailsSlice";
import friendListSlice from "./features/friendListSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  userInfo: loginInfoSlice,
  notification: notificationSlice,
  RequestDetails: friendRequestDetailsSlice,
  friendList: friendListSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
