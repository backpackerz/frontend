import * as Api from "./request.api";
import { UserLoginProps } from "@backpackerz/core/index.d";

export default class SessionService {
	static async login(payloads: UserLoginProps) {
		const result = await Api.login(payloads);

		return result;
	}
	static async logout() {
		await Api.logout();
	}
	static async getCurrentUser() {
		const result = await Api.getCurrentUser();

		return result;
	}
}
