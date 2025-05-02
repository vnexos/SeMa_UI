import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "./base";
import languageReducer from "./slices/languageSlice";

export const store: any = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    language: languageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
