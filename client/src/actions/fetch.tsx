import axios from "axios";
import { isExpired } from "react-jwt";

const host = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	withCredentials: true,
});

const authHost = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	withCredentials: true,
});

authHost.interceptors.request.use(async (config) => {
	let accessToken = localStorage.getItem("accessToken");
	if (!accessToken || isExpired(accessToken)) {
		const { data } = await host.get("/auth/refresh");
		if (data.accessToken) {
			accessToken = data.accessToken;
			localStorage.setItem("accessToken", data.accessToken);
		}
	}
	config.headers.Authorization = `Bearer ${accessToken}`;
	return config;
});

export { authHost, host };
