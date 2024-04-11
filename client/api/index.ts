import axios, { AxiosError } from "axios";

export const appApiPrivate = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const appApi = (token?: string) =>
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    withCredentials: true,
  });

export const handleApiError = (error: AxiosError) => {
  if (error.response) {
    return {
      message:
        (error.response.data as any).message ||
        "Unexpected error, please try again",
    };
  }

  if (error.request) {
    return {
      message: "Please check your network or try again later",
    };
  }

  return {
    message: "Unexpected error occurred, please try again",
  };
};
