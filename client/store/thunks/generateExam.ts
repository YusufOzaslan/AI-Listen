import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { handleApiError } from "@/api";

interface IBody {
    examName: string;
    school: string;
    class: string;
    capacity: number;
    timeLimitInMinutes: number;
  }

export const generateExam = createAsyncThunk(
  "generateExam",
  async ({ contentId, axios, body }: { contentId: string; axios: AxiosInstance; body: IBody; }) => {
    try {
      const response = await axios.post(
        `/exam/${contentId}`,
        body
      );
      return response.data;
    } catch (err: any) {
      throw new Error(handleApiError(err).message);
    }
  }
);