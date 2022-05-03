import axios from "../http";
import { SessionType } from "./type.d";
import { UserType } from "../user/type.d";
import { userTranslator } from "./request.translator";

export async function login(payloads: SessionType.LoginProps) {
	const response = await axios.post<{ user: UserType.User }>(
		"/auth/login",
		payloads,
	);
	return userTranslator(response.data.user);
}

export async function logout() {
	return axios.post<void>("/auth/logout");
}

export async function getCurrentUser() {
	const response = await axios.get<{ user: UserType.User }>("/auth");
	return userTranslator(response.data.user);
}
