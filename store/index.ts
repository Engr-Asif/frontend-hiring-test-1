import type { TypedUseSelectorHook } from "react-redux";
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import type { ThunkAction } from "redux-thunk";
import type { AnyAction } from "@reduxjs/toolkit";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import {
  getLocalStorage,
  setLocalStorage,
  clearLocalStorage,
  clearSessionStorage,
} from "@utils";

import { enableDevTools } from "@root/config";

// api
import { baseAPI } from "@services/base-api";

// reducers
import { authReducer } from "@slices";

const persistConfig = {
  key: "root",
  version: 1,
  whitelist: ["auth"],
  storage,
};

const appReducer = combineReducers({
  auth: authReducer,
  [baseAPI.reducerPath]: baseAPI.reducer,
});

const rootReducer = (state: any, action: any): any => {
  // Clear all data in redux store to initial.
  if (action.type === "auth/logout") {
    state = undefined;
    // Step 2: Before Logging Out
    const rememberMeData = getLocalStorage("rememberMe");

    // Step 3: Clear Local Storage (except "Remember Me" data)
    clearLocalStorage();
    clearSessionStorage();

    // Step 4: Restore the "Remember Me" Data
    if (rememberMeData) {
      setLocalStorage("rememberMe", rememberMeData);
    }
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: enableDevTools as unknown as boolean,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(baseAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, AnyAction>;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const useDispatch = (): any => useReduxDispatch<AppDispatch>();
