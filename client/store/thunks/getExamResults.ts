import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { handleApiError } from "@/api";

export const getExamResults = createAsyncThunk(
  "getExamResults",
  async (axios: AxiosInstance) => {
    try {
      const response = await axios.get("/exams/exam-results");
      return response.data;
    } catch (err: any) {
      throw new Error(handleApiError(err).message);
    }
  }
);
