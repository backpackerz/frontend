import * as Constatnts from "./variables/constants";
import * as Enums from "./variables/enums";
import * as Validations from "./validation/schemas";
import HTTP from "./http";

import ServiceUser from "./user/service";
import ServiceSession from "./session/service";
import ServiceItinerary from "./itinerary/service";
import ServiceStory from "./story/service";

import Types from "@backpackerz/core/index.d";

declare module "." {
	namespace BackpackerzTypes {
		type User = Types.Entity.User;
		type Itinerary = Types.Entity.Itinerary;
		type Story = Types.Entity.Story;
	}
}
export const CONSTATANTS = Constatnts;
export const ENUMS = Enums;
export const VALIDATIONS = Validations;
export const http = HTTP;
export const User = {
	service: ServiceUser,
};
export const Session = {
	service: ServiceSession,
};
export const Itinerary = {
	service: ServiceItinerary,
};
export const Story = {
	service: ServiceStory,
};
export default {
	CONSTATANTS,
	ENUMS,
	VALIDATIONS,
	http,
	User,
	Session,
	Itinerary,
	Story,
};
