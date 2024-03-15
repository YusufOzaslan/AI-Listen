import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleApiError } from "./handleApiError";

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
  "generateListeningScript",
  async ({ body }: { body: IBody }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/dialogue/generate-dialogue`,
        body
      );
      return response.data;
    } catch (err: any) {
      throw new Error(handleApiError(err).message);
    }
  }
);
