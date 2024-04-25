import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleApiError, appApi } from "@/api";

export const signOut = createAsyncThunk("signOut", async () => {
  try {
    const response = await appApi().delete("/auth/sign-out");
    return response.data;
  } catch (err: any) {
    throw new Error(handleApiError(err).message);
  }
});
