import { login, logout, getCurrentUser } from "./request.api";
import { SessionCreateProps } from "@backpackerz/core/index.d";

export default class SessionService {
	static async login(payloads: SessionCreateProps) {
		const user = await login(payloads);
		return user;
	}
	static async logout() {
		await logout();
	}
	static async getCurrentUser() {
		const user = await getCurrentUser();
		return user;
	}
}
