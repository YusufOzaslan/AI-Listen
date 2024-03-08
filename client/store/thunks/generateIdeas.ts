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
}

export const generateIdeas = createAsyncThunk(
  "generateIdeas",
  async ({ axios, body }: { axios: AxiosInstance; body: IBody }) => {
    try {
      const response = await axios.post("/generate-three-ideas", body);
      return response.data;
    } catch (err: any) {
      throw new Error(handleApiError(err).message);
    }
  }
);
