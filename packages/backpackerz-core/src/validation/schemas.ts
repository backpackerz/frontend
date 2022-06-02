import { object, number, string, date, ref, SchemaOf, bool, mixed } from "yup";
import { USER_VALIDATION_ERROR_MESSAGE } from "../variables/constants";
import * as ENUMS from "../variables/enums";

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

export const itinerarySchema: SchemaOf<
	Pick<
		Backpackerz.Entity.Itinerary,
		| "id"
		| "slug"
		| "title"
		| "description"
		| "body"
		| "departureDate"
		| "arrivalDate"
		| "period"
		| "personnel"
		| "state"
		// | "tags"
		// | "comments"
		// | "favoritesCount"
		| "createdAt"
		| "updatedAt"
		// | "user"
		// | "stories"
		| "isOwn"
	>
> = object().shape({
	id: number().required(),
	slug: string().required(),
	title: string().required(),
	description: string().required(),
	body: string().required(),
	departureDate: date().required(),
	arrivalDate: date().required(),
	period: number().required().positive(),
	personnel: number().required().min(1).max(3),
	state: mixed<ENUMS.ItineraryState>()
		.required()
		.oneOf(Object.values(ENUMS.ItineraryState)),
	createdAt: date().required(),
	updatedAt: date().required(),
	isOwn: bool().required(),
});

export const itineraryUpdateSchema: SchemaOf<Backpackerz.ItineraryUpdateProps> =
	itinerarySchema.pick([
		"title",
		"description",
		"body",
		"state",
		"personnel",
		"departureDate",
		"arrivalDate",
	]);
