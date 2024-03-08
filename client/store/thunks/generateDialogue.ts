import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { handleApiError } from "./handleApiError";

interface IBody {
  title: string;
  level: string;
  ageGroup: string;
  numberOfWords: number;
  listeningTaskOptions: string;
  listeningTaskCategories: string;
  ideaGenerator: string;
  wordsforScript: string;
}

export const generateDialogue = createAsyncThunk(
  "generateListeningScript",
  async ({ axios, body }: { axios: AxiosInstance; body: IBody }) => {
    try {
      const response = await axios.post("/generate-listening-script", body);
      return response.data;
    } catch (err: any) {
      throw new Error(handleApiError(err).message);
    }
  }
);
