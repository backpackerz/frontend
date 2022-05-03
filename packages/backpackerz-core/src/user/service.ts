import { UserType } from "./type.d";
import { createUser, getUserDetail } from "./request.api";

export default class UserService {
	static createUser(user: UserType.UserCreateProps) {
		return createUser(user).then((user: UserType.User) => {
			return user;
		});
	}
	static getUserDetail(id: number) {
		return getUserDetail(id).then((user: UserType.User) => {
			return user;
		});
	}
}
