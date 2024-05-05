import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { handleApiError } from "@/api";

interface IBody {
    studentName: string;
    studentNumber: string;
  }

export const startExam = createAsyncThunk(
  "startExam",
  async ({ examCode, axios, body }: { examCode: string; axios: AxiosInstance; body: IBody; }) => {
    try {
      const response = await axios.post(
        `/exams/${examCode}/start`,
        body
      );
      return response.data;
    } catch (err: any) {
      throw new Error(handleApiError(err).message);
    }
  }
);