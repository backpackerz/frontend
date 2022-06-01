import * as Api from "./request.api";
import { UserJoinProps } from "@backpackerz/core/index.d";
import { userJoinSchema } from "@backpackerz/core/validation/schemas";

export default class UserService {
	static async createUser(user: UserJoinProps) {
		const validatedUser = await userJoinSchema.validate(user, {
			abortEarly: false,
		});
		const result = await Api.createUser(validatedUser);

		return result;
	}
	static async getUserDetail(id: number) {
		const result = await Api.getUserDetail(id);

		return result;
	}
}
