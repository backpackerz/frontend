import * as Enums from "./variables/enums";
import HTTP from "./http";

export * from "./user/type.d";
import ServiceUser from "./user/service";

export * from "./session/type.d";
import ServiceSession from "./session/service";

export * from "./itinerary/type.d";
import ServiceItinerary from "./itinerary/service";

export * from "./story/type.d";
import ServiceStory from "./story/service";

declare module "." {
	namespace Types {
		type User = import("./user/type").UserType.User;
		type Itinerary = import("./itinerary/type").ItineraryType.Itinerary;
		type Story = import("./story/type").StoryType.Story;
	}
}
export const ENUMS = Enums;
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
	ENUMS,
	http,
	User,
	Session,
	Itinerary,
	Story,
};
