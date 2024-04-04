import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { signIn, signUp, signOut } from "@/store/thunks";

export interface IAuth {
  name: string;
  email: string;
  role: string;
}

interface IState {
  isLoading: boolean;
  user: IAuth | null;
  error: string | null;
}

const initialState: IState = {
  isLoading: false,
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut(state) {
      state.user = null;
    },
  },
  extraReducers(build) {
    // sign in
    build.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });
    build.addCase(
      signIn.fulfilled,
      (state, { payload }: PayloadAction<IAuth>) => {
        state.isLoading = false;
        state.error = null;
        state.user = payload;
        console.log(state.user);
      }
    );
    build.addCase(signIn.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message!;
    });

    // sign up
    build.addCase(signUp.pending, (state) => {
      state.isLoading = true;
    });

    build.addCase(
      signUp.fulfilled,
      (state, { payload }: PayloadAction<IAuth>) => {
        state.isLoading = false;
        state.error = null;
        state.user = payload;
      }
    );
    build.addCase(signUp.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error.message!;
    });
    // signOut
    build.addCase(signOut.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
      state.user = null;
    });
  },
});

const authtReducer = authSlice.reducer;
const authCreators = authSlice.actions;

export { authtReducer, authCreators };
