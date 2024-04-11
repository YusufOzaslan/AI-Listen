import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { handleApiError } from "@/api";

interface IBody {
  voice: string[];
}
export const generateDialogueSpeech = createAsyncThunk(
  "generateDialogueSpeech",
  async ({
    contentId,
    axios,
    body,
  }: {
    contentId: string;
    axios: AxiosInstance;
    body: IBody;
  }) => {
    try {
      const response = await axios.post(
        `/dialogue/${contentId}/generate-dialogue-speech`,
        body
      );
      return response.data;
    } catch (err: any) {
      throw new Error(handleApiError(err).message);
    }
  }
);
