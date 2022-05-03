import axios from "../http";
import { UserType } from "./type.d";
import { userTranslator } from "./request.translator";

export async function createUser(payloads: UserType.UserCreateProps) {
	const { data } = await axios.post<{ user: UserType.User }>(
		"/users",
		payloads,
	);
	return userTranslator(data.user);
}

export function getUserDetail(id: number) {
	return axios
		.get<{ user: UserType.User }>(`/users/${id}`)
		.then(({ data }) => {
			return userTranslator(data.user);
		});
}
