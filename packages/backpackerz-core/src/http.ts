import axios, { AxiosRequestConfig } from "axios";

const host =
	process.env.APP_API_HOST ||
	(process.env.NODE_ENV === "development"
		? "http://localhost:8000/api/"
		: "/api");

const http = axios.create({
	baseURL: host,
	headers: {
		"Content-Type": "application/json;charset=UTF-8",
		"Cache-directive": "no-cache",
		"Pragma-directive": "no-cache",
		Pragma: "no-cache",
		"Cache-Control": "no-cache",
		Expires: "-1",
	},
	timeout: 40000,
	withCredentials: true,
	validateStatus: function (status) {
		return status >= 200 && status < 300;
	},
});
http.interceptors.request.use(
	function (config: AxiosRequestConfig) {
		return config;
	},
	function (error) {
		return Promise.reject(error);
	},
);

http.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		return Promise.reject(error);
	},
);

export default http;
