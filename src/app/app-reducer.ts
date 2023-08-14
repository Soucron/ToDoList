import { Dispatch } from "redux";

import { authActions } from "../features/Login/auth.reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "./store";
import { authAPI } from "../features/Login/auth.api";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"


const initialState = {
  status: "idle" as RequestStatusType,
  error: null as string | null,
  isInitialized: false
};


const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized;
    }
  }
});

export const appActions = slice.actions;
export const appReducer = slice.reducer;



export const initializeAppTC = (): AppThunk => (dispatch: Dispatch) => {
  authAPI.me().then(res => {
    if (res.data.resultCode === 0) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
    } else {

    }

    dispatch(appActions.setInitialized({isInitialized: true}))
  });
};





