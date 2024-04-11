import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { handleApiError } from "@/api";

export const generateImage = createAsyncThunk(
  "generateImage",
  async ({ contentId, axios }: { contentId: string; axios: AxiosInstance }) => {
    try {
      const response = await axios.post(
        `/dialogue/${contentId}/generate-image`
      );
      return response.data;
    } catch (err: any) {
      throw new Error(handleApiError(err).message);
    }
  }
);
