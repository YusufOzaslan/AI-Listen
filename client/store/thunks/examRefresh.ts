import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleApiError, appApi } from "@/api";

export const examRefresh = createAsyncThunk("examRefresh", async () => {
  try {
    const response = await appApi().get("/exams/refresh");
    return response.data;
  } catch (err: any) {
    throw new Error(handleApiError(err).message);
  }
});
