import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { handleApiError } from "@/api";

interface IBody {
  numberOfQuestions: number;
}
export const generateQuestions = createAsyncThunk(
  "generateQuestions",
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
        `/dialogue/${contentId}/generate-questions`,
        body
      );
      return response.data;
    } catch (err: any) {
      throw new Error(handleApiError(err).message);
    }
  }
);
