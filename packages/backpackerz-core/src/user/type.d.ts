import { ItineraryType } from "../itinerary/type.d";

export namespace UserType {
	export type User = {
		id: number;
		email: string;
		nickname: string;
		password?: string;
		itineraries: ItineraryType.Itinerary[];
		// stories!: StoryEntity[];
	};
	export type UserCreateProps = {
		email: string;
		password: string;
		nickname: string;
	};
}
