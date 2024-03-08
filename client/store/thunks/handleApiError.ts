import axios, { AxiosError } from "axios";
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
