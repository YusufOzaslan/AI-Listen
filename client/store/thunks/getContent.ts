import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { handleApiError } from "@/api";

export const getContent = createAsyncThunk(
  "getContent",
  async ({ axios, contentId }: { axios: AxiosInstance; contentId: string }) => {
    try {
      const response = await axios.get(`/contents/${contentId}`);
      return response.data;
    } catch (err: any) {
      throw new Error(handleApiError(err).message);
    }
  }
);
