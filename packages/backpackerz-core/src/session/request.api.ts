import axios from "../http";
import { userTranslator } from "./request.translator";
import { Entity, UserLoginProps } from "@backpackerz/core/index.d";

export async function login(payloads: UserLoginProps) {
	const response = await axios.post<{ user: Entity.User }>(
		"/auth/login",
		payloads,
	);
	return userTranslator(response.data.user);
}

export async function logout() {
	return axios.post<void>("/auth/logout");
}

export async function getCurrentUser() {
	const response = await axios.get<{ user: Entity.User }>("/auth");
	return userTranslator(response.data.user);
}
