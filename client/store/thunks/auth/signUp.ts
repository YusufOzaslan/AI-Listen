import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleApiError, appApi } from "@/api";

interface IBody {
  name: string;
  email: string;
  password: string;
}

export const signUp = createAsyncThunk(
  "signUp",
  async ({ body }: { body: IBody }) => {
    try {
      const response = await appApi().post("/auth/sign-up", body);
      return response.data;
    } catch (err: any) {
      throw new Error(handleApiError(err).message);
    }
  }
);
