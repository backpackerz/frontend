import { CreateUserDto } from "../user/type.d";

export declare namespace SessionType {
	export type LoginProps = Pick<CreateUserDto, "email" | "password">;
}
