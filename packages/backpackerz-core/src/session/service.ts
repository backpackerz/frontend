import { SessionType } from "./type.d";
import { login, logout, getCurrentUser } from "./request.api";

export default class SessionService {
	static async login(payloads: SessionType.LoginProps) {
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
