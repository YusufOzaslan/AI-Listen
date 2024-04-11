import { useEffect } from "react";
import { appApiPrivate } from "@/api";
import { useAuth } from "./useAuth";

export const useApi = () => {
  const { accessToken, refresh } = useAuth();

  useEffect(() => {
    const requestIntercept = appApiPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${accessToken?.value}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = appApiPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = (await refresh()).payload.accessToken.value;
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return appApiPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      appApiPrivate.interceptors.request.eject(requestIntercept);
      appApiPrivate.interceptors.response.eject(responseIntercept);
    };
  }, []);

  return appApiPrivate;
};
