import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleApiError } from "./handleApiError";

export const signOut = createAsyncThunk("signOut", async () => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-out`
    );
    return response.data;
  } catch (err: any) {
    throw new Error(handleApiError(err).message);
  }
});
