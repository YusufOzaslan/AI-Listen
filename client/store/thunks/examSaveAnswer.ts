import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { handleApiError } from "@/api";

interface IBody {
  questionId: string;
  answer: string;
}

export const examSaveAnswer = createAsyncThunk(
  "examSaveAnswer",
  async ({ axios, body }: { axios: AxiosInstance; body: IBody[] }) => {
    try {
      const response = await axios.patch("/exams/save-answer", body);
      return response.data;
    } catch (err: any) {
      throw new Error(handleApiError(err).message);
    }
  }
);
