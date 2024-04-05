import {createAsyncThunk} from '@reduxjs/toolkit';
import { handleApiError } from "../handleApiError";
import axios from "axios";

export const refresh = createAsyncThunk(
  "refresh",
  async () => {
    try {
      const response = await axios.get('/auth/refresh');
      return response.data;
    } catch (err: any) {
      throw new Error(handleApiError(err).message);
    }
  }
);
