import axios from "../http";
import { userTranslator } from "./request.translator";
import { Entity, UserCreateProps } from "@backpackerz/core/index.d";

export async function createUser(payloads: UserCreateProps) {
	const { data } = await axios.post<{ user: Entity.User }>(
		"/users",
		payloads,
	);
	return userTranslator(data.user);
}

export function getUserDetail(id: number) {
	return axios.get<{ user: Entity.User }>(`/users/${id}`).then(({ data }) => {
		return userTranslator(data.user);
	});
}
