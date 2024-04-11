import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { handleApiError } from "@/api";

export const generateDialogueSpeech = createAsyncThunk(
  "generateDialogueSpeech",
  async ({ contentId, axios }: { contentId: string; axios: AxiosInstance }) => {
    try {
      const response = await axios.post(
        `/dialogue/${contentId}/generate-dialogue-speech`
      );
      return response.data;
    } catch (err: any) {
      throw new Error(handleApiError(err).message);
    }
  }
);
