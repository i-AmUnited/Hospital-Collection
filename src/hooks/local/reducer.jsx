import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { apiEndPoints } from "../remote/apiEndpoints";
import { showErrorMessage, retrieveFromLocalStorage } from "../constants";

const initialState = {
  users: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  ...retrieveFromLocalStorage(["userSession"]),
};

const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, data);
};

export const userSignIn = createAsyncThunk("user/signIn",
   async (values) => {
    try{
      const signInEndPoint = await apiEndPoints.signIn(values);
      const response = await signInEndPoint.data;
      saveToLocalStorage("userSession", JSON.stringify(response));
      saveToLocalStorage("token", JSON.stringify(response.result.access_token));
      // console.log(response.result.access_token)
      return response;
    }
    catch(error){
      return error.response.data;
    }
});

const signOutSession = () => {
  localStorage.removeItem("users");
  localStorage.removeItem("userSession");
  localStorage.removeItem("token");
};

export const signOut = createAsyncThunk("user/signOut", async () => {
  signOutSession();
});

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (values) => {
    try {
      const registrationEndPoint =
        await apiEndPoints.register(values);
      const response = await registrationEndPoint.data;
      return response;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (values) => {
    try {
      const forgotPasswordEndPoint =
        await apiEndPoints.forgotPassword(values);
      const response = await forgotPasswordEndPoint.data;
      return response;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (values) => {
    try {
      const resetPasswordEndPoint =
        await apiEndPoints.resetPassword(values);
      const response = await resetPasswordEndPoint.data;
      return response;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const dashboardStats = createAsyncThunk(
  "user/dashboardStats",
  async (values) => {
    try {
      const dashboardStatsEndPoint =
        await apiEndPoints.dashboard(values);
      const response = await dashboardStatsEndPoint.data;
      return response;
    } catch (error) {
      return error.response.data;
    }
  }
);


const slice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userSignIn.fulfilled, (state, action) => {
        if (action.payload.statusCode === 200) {
          state.users = action.payload;
          state.isAuthenticated = true;
          state.userSession = action.payload;
        } else {
          state.error = action.payload.message;
          showErrorMessage(action.payload.message);
        }
        state.loading = false;
      })

      .addCase(userSignIn.pending, (state) => {
        state.loading = true;
        state.users = null;
        state.isAuthenticated = false;
      })

      .addCase(signOut.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.users = null;
      })

      // 200 Success
      .addMatcher(
        isAnyOf(
          forgotPassword.fulfilled,
          resetPassword.fulfilled,
          dashboardStats.fulfilled,
        ),
        (state, action) => {
          state.loading = false;
          if (action.payload.statusCode === 200) {
            state.users = action.payload.data;
          } else {
            state.error = action.payload.message;
            showErrorMessage(action.payload.message);
          }
        }
      )

      // 201 Success
      .addMatcher(
        isAnyOf(
          registerUser.fulfilled,
        ),
        (state, action) => {
          state.loading = false;
          if (action.payload.statusCode === 201) {
            state.users = action.payload.data;
          } else {
            state.error = action.payload.message;
            showErrorMessage(action.payload.message);
          }
        }
      )

      .addMatcher(
        isAnyOf(
        registerUser.pending,
        forgotPassword.pending,
        resetPassword.pending,
        dashboardStats.pending,
        ),
        (state) => {
          state.loading = true;
          state.error = null;
          state.users = null;
        }
      )

      .addMatcher(
        isAnyOf(
        registerUser.rejected,
        forgotPassword.rejected,
        resetPassword.rejected,
        dashboardStats.rejected,
        ),
        (state, action) => {
          state.loading = false;
          state.users = null;
          const { data } = action.payload || {};
          let errorMessage = data?.message || "Failed, Try again later";
          state.error = showErrorMessage(errorMessage);
        }
      );
  },
});

export const userReducer = slice.reducer;
