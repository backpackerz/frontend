import axios from "../http";
import { userTranslator } from "./request.translator";
import { Entity, UserJoinProps } from "@backpackerz/core/index.d";

export async function createUser(payloads: UserJoinProps) {
	const { data } = await axios.post<{ user: Entity.User }>("/users", {
		email: payloads.email,
		password: payloads.password,
		nickname: payloads.nickname,
	});
	return userTranslator(data.user);
}

export function getUserDetail(id: number) {
	return axios.get<{ user: Entity.User }>(`/users/${id}`).then(({ data }) => {
		return userTranslator(data.user);
	});
}
