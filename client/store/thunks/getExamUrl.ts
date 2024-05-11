import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { handleApiError } from "@/api";

export const getExamUrl = createAsyncThunk(
  "getExamUrl",
  async ({ contentId, axios }: { contentId: string; axios: AxiosInstance }) => {
    try {
      const response = await axios.get(`/exams/${contentId}/url`);
      return response.data;
    } catch (err: any) {
      throw new Error(handleApiError(err).message);
    }
  }
);
