import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import toast from "react-hot-toast";

import { HttpHandler } from "@/core/interfaces/HttpHandler";
import { getCookie } from "@/core/utils/CookiesUtil";
import { HTTP_STATUS_CODES } from "@/core/utils/HttpStatusCodes";
import { ACCESS_TOKEN_COOKIE_NAME } from "@/shared/api-routes/api-routes";

export class AxiosClient implements HttpHandler {
  private static instance: AxiosClient;
  private axiosInstance: AxiosInstance;
  private static readonly baseUrl: string =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3004/api";
  private static accessToken: string | null = null;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: AxiosClient.baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const token = await getCookie(ACCESS_TOKEN_COOKIE_NAME);

        if (token) {
          config.headers.Authorization = `Bearer ${token.replaceAll('"', "")}`;
        } else {
          document.dispatchEvent(new CustomEvent("unauthorized"));
        }

        return config;
      },
      (error) => {
        Promise.reject(error);
      },
    );

    this.axiosInstance.interceptors.response.use(
      (response) => {
        if (!["get"].includes(response.config.method || ""))
          toast.success("Acción realizada con éxito!");

        return response;
      },
      (error) => {
        if (error.response) {
          toast.error(
            `Error: ${error.response.status} ${error.response.data?.message || error.message}`,
          );
        } else {
          toast.error(`Error: ${error.message}`);
        }
        if (error.response?.status === HTTP_STATUS_CODES.FORBIDDEN) {
          if (typeof window !== "undefined") {
            window.location.href = "/dashboard";
          }
        }

        return Promise.reject(error);
      },
    );
  }

  public static getInstance(): AxiosClient {
    if (!this.instance) {
      this.instance = new AxiosClient();
    }

    return this.instance;
  }

  public static setAccessToken(accessToken: string): void {
    this.accessToken = accessToken;
    if (this.instance) {
      this.instance.axiosInstance.defaults.headers["Authorization"] =
        `Bearer ${accessToken}`;
    }
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const promise = this.axiosInstance.get<T>(url, config);
    const response: AxiosResponse<T> = await promise;

    return response.data;
  }

  async post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(
      url,
      data,
      config,
    );

    return response.data;
  }

  async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(
      url,
      data,
      config,
    );

    return response.data;
  }

  async patch<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.patch(
      url,
      data,
      config,
    );

    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(
      url,
      config,
    );

    return response.data;
  }
}
