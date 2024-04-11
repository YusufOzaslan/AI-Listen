import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { handleApiError } from "@/api";

interface IBody {
  level: string;
  ageGroup: string;
  numberOfWords: string;
  listeningTaskOptions: string;
  listeningTaskCategories: string;
  ideaGenerator: string;
  wordsforScript: string;
}

export const generateDialogue = createAsyncThunk(
  "generateDialogue",
  async ({ body, axios }: { body: IBody; axios: AxiosInstance }) => {
    try {
      const response = await axios.post("/dialogue/generate-dialogue", body);
      return response.data;
    } catch (err: any) {
      throw new Error(handleApiError(err).message);
    }
  }
);
