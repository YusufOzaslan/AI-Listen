import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { handleApiError } from "@/api";
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
  async ({ body, axios }: { body: IBody; axios: AxiosInstance }) => {
    try {
      const response = await axios.post("/dialogue/generate-ideas", body);
      return response.data;
    } catch (err: any) {
      throw new Error(handleApiError(err).message);
    }
  }
);
