import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { handleApiError, appApi } from "@/api";

export const finishExam = createAsyncThunk("finishExam", async () => {
  try {
    const response = await appApi().patch("/exams/finish-exam");
    return response.data;
  } catch (err: any) {
    throw new Error(handleApiError(err).message);
  }
});
