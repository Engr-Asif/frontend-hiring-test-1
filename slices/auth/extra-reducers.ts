import type { PayloadAction } from "@reduxjs/toolkit";
import { setSessionStorage } from "@utils";

type LoginAction = PayloadAction<any>;

export const loginSuccess = (state: AuthState, action: LoginAction): void => {
  const data = action.payload;
  state.accessToken = data.access_token;
  state.refreshToken = data.refresh_token;
  state.user = data.user;
  state.isAuthenticated = true;

  setSessionStorage("accessToken", data.access_token);
  setSessionStorage("refreshToken", data.refresh_token);
};

export const authMeSuccess = (state: AuthState, action: LoginAction): void => {
  const data = action.payload;
  state.user = data;
  state.isAuthenticated = true;

  //  state.accessToken = data.access_token;
  //  setSessionStorage("accessToken", data.access_token);
};
