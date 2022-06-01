import { object, number, string, ref, SchemaOf } from "yup";
import { USER_VALIDATION_ERROR_MESSAGE } from "../variables/constants";

export const userSchema: SchemaOf<
	Pick<Backpackerz.Entity.User, "id" | "email" | "password" | "nickname">
> = object().shape({
	id: number().required(),
	email: string()
		.required(USER_VALIDATION_ERROR_MESSAGE.EMAIL_IS_REQUIRED)
		.email(USER_VALIDATION_ERROR_MESSAGE.INVALID_EMAIL_FORMAT),
	password: string().required(
		USER_VALIDATION_ERROR_MESSAGE.PASSWORD_IS_REQUIRED,
	),
	nickname: string().required(
		USER_VALIDATION_ERROR_MESSAGE.NICKNAME_IS_REQUIRED,
	),
});

export const sessionCreateSchema: SchemaOf<Backpackerz.UserLoginProps> =
	userSchema.pick(["email", "password"]);

export const userJoinSchema: SchemaOf<Backpackerz.UserJoinProps> = userSchema
	.pick(["email", "password", "nickname"])
	.shape({
		passwordCheck: string()
			.required(USER_VALIDATION_ERROR_MESSAGE.PASSWORD_CHECK_IS_REQUIRED)
			.oneOf(
				[ref("password")],
				USER_VALIDATION_ERROR_MESSAGE.PASSWORD_CHECK_IS_NOT_EQUAL,
			),
	});
