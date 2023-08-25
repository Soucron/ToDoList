import { authAPI, LoginParamsType } from "api/todolists-api";
import {handleServerNetworkError } from "utils/error-utils";
import { createSlice,  } from "@reduxjs/toolkit";
import { appActions } from "app/app.reducer";
import { clearTasksAndTodolists } from "common/actions/common.actions";
import { createAppAsyncThunk } from "../../utils/create-app-async-thunk";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(authThunks.login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(authThunks.logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(initializeApp.fulfilled, (state,action) => {
        state.isLoggedIn  = action.payload.isLoggedIn
      })
  }
});



// thunks

const login = createAppAsyncThunk<{ isLoggedIn : boolean }, LoginParamsType>
("auth/login", async (data, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    const res = await authAPI.login(data);
    if (res.data.resultCode === 0) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { isLoggedIn: true };
    } else {
      handleServerNetworkError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
});

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>("auth/logout", async (data, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    const res = await authAPI.logout();
    if (res.data.resultCode === 0) {
      dispatch(clearTasksAndTodolists());
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { isLoggedIn: false };
    } else {
      handleServerNetworkError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
});

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>("app/initializeApp", async (_, thunkApi) => {
  const { dispatch, rejectWithValue } = thunkApi;
  try {
    const res = await authAPI.me();
    if (res.data.resultCode === 0) {
      return { isLoggedIn: true };
    } else {
      handleServerNetworkError(res.data, dispatch);
      return rejectWithValue(null);
    }

  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  } finally {
    dispatch(appActions.setAppInitialized({ isInitialized: true }));
  }
});




export const authReducer = slice.reducer;
export const authActions = slice.actions;

export const authThunks = {login, logout, initializeApp}
