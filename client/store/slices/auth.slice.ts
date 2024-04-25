import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { signIn, signUp, signOut, refresh } from "@/store/thunks";
interface IToken {
  value: string;
  expiryDate: string;
}
interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}
export interface IAuth {
  user: IUser
  accessToken: IToken;
}

interface IState {
  isLoading: boolean;
  data: IAuth | null;
  error: string | null;
}

const initialState: IState = {
  isLoading: false,
  data: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut(state) {
      state.data = null;
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
        state.data = payload;
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
        state.data = payload;
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
      state.data = null;
    });

    // refresh
    build.addCase(
      refresh.fulfilled,
      (state, { payload }: PayloadAction<IAuth>) => {
        state.isLoading = false;
        state.error = null;
        state.data = payload;
      }
    );
  },
});

const authtReducer = authSlice.reducer;
const authCreators = authSlice.actions;

export { authtReducer, authCreators };
