import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleApiError } from "./handleApiError";

interface IBody {
  name: string;
  email: string;
  password: string;
}

export const signUp = createAsyncThunk(
  "signUp",
  async ({ body }: { body: IBody }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`,
        body
      );
      return response.data;
    } catch (err: any) {
      throw new Error(handleApiError(err).message);
    }
  }
);
