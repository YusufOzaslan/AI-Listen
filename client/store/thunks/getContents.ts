import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { handleApiError } from "@/api";

export const getContents = createAsyncThunk(
  "getContents",
  async (axios: AxiosInstance) => {
    try {
      const response = await axios.get(`/contents`);
      return response.data;
    } catch (err: any) {
      throw new Error(handleApiError(err).message);
    }
  }
);
