import { createUser, getUserDetail } from "./request.api";
import { Entity, UserCreateProps } from "@backpackerz/core/index.d";

export default class UserService {
	static createUser(user: UserCreateProps) {
		return createUser(user).then((user: Entity.User) => {
			return user;
		});
	}
	static getUserDetail(id: number) {
		return getUserDetail(id).then((user: Entity.User) => {
			return user;
		});
	}
}
