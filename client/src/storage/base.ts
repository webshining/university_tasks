import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";
import { AxiosError, AxiosRequestConfig } from "axios";
import { authHost } from "../actions/fetch";

export const axiosBaseQuery =
	(
		{ baseUrl }: { baseUrl: string } = { baseUrl: String(process.env.REACT_APP_API_URL) },
	): BaseQueryFn<AxiosRequestConfig, unknown, unknown> =>
	async ({ url, method, data, params }: AxiosRequestConfig) => {
		try {
			const result = await authHost({ url: baseUrl + url, method, data, params });
			return { data: result.data };
		} catch (axiosError) {
			let err = axiosError as AxiosError;
			return {
				error: {
					status: err.response?.status,
					data: err.response?.data || err.message,
				},
			};
		}
	};
