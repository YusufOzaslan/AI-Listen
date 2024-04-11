import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleApiError, appApi } from "@/api";

interface IBody {
  email: string;
  password: string;
}

export const signIn = createAsyncThunk(
  "signIn",
  async ({ body }: { body: IBody }) => {
    try {
      const response = await appApi().post("/auth/sign-in", body);
      console.log(response.headers);
      return response.data;
    } catch (err: any) {
      throw new Error(handleApiError(err).message);
    }
  }
);
