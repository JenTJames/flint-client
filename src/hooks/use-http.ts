import { useCallback, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

interface HttpResponse<T> {
  data: T | null;
  isError: boolean;
  message: string;
  error: AxiosError | null;
}

const useHttp = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const requestData = useCallback(
    async <T>(
      endpoint: string,
      method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
      data: object | null = null
    ): Promise<HttpResponse<T>> => {
      setLoading(true);
      try {
        const response: AxiosResponse<T> = await axios({
          method,
          url: import.meta.env.VITE_BACKEND_BASE_URL + endpoint,
          data,
        });

        return {
          data: response.data,
          isError: false,
          message: "Request successful",
          error: null,
        };
      } catch (error) {
        const axiosError = error as AxiosError;
        const message =
          axiosError.response?.status === 500
            ? "Internal Server Error"
            : axiosError.message ||
              "Something went wrong. Please try again later";

        return {
          data: null,
          isError: true,
          message,
          error: axiosError,
        };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    loading,
    requestData,
  };
};

export default useHttp;
