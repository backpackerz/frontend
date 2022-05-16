import { object, string, ref } from "yup";

import { USER_VALIDATION_ERROR_MESSAGE } from "../variables/constants";

export const userSchema = object().shape({
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

export const signUpSchema = userSchema.shape({
	passwordCheck: string()
		.required(USER_VALIDATION_ERROR_MESSAGE.PASSWORD_CHECK_IS_REQUIRED)
		.oneOf(
			[ref("password")],
			USER_VALIDATION_ERROR_MESSAGE.PASSWORD_CHECK_IS_NOT_EQUAL,
		),
});
