import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { handleApiError } from "@/api";

export const getQuestion = createAsyncThunk(
  "getQuestion",
  async ({ axios, contentId }: { axios: AxiosInstance; contentId: string }) => {
    try {
      const response = await axios.get(`/questions/${contentId}`);
      return response.data;
    } catch (err: any) {
      throw new Error(handleApiError(err).message);
    }
  }
);
