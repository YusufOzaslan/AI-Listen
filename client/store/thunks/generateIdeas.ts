import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleApiError } from "./handleApiError";
import dotenv from "dotenv";
dotenv.config();

interface IBody {
  level: string;
  ageGroup: string;
  numberOfWords: string;
  listeningTaskOptions: string;
  listeningTaskCategories: string;
  ideaGenerator: string;
}

export const generateIdeas = createAsyncThunk(
  "generateIdeas",
  async ({ body }: { body: IBody }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/idea/generate-ideas`,
        body
      );
      return response.data;
    } catch (err: any) {
      throw new Error(handleApiError(err).message);
    }
  }
);
