import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleApiError, appApi } from "@/api";

export const refresh = createAsyncThunk("refresh", async () => {
  try {
    const response = await appApi().get("/auth/refresh");
    return response.data;
  } catch (err: any) {
    throw new Error(handleApiError(err).message);
  }
});
