import * as ENUMS from "./variables/enums";

export = Backpackerz;
export as namespace Backpackerz;

declare namespace Backpackerz {
	export namespace Entity {
		export type User = {
			id: number;
			email: string;
			nickname: string;
			password?: string;
			itineraries: Itinerary[];
			// stories!: StoryEntity[];
		};
		export type Itinerary = {
			id: number;
			slug: string;
			title: string;
			description: string;
			body: string;
			departureDate: string;
			arrivalDate: string;
			period: number;
			personnel: number;
			state: ENUMS.ItineraryState;
			tags: string[];
			comments: string[];
			favoritesCount: number;
			createdAt: Date;
			updatedAt: Date;
			user: User;
			stories: Story[];
			isOwn: boolean;
		};

		export type Story = {
			id: number;
			slug: string;
			type: ENUMS.StoryType;
			transit: ENUMS.StoryTransits;
			title: string;
			description: string;
			body: string;
			startTime: string;
			endTime: string;
			comments: string[];
			favoritesCount: number;
			createdAt: Date;
			updatedAt: Date;
			deletedAt?: Date;
			user: User;
		};
	}
	export type UserCreateProps =
		//
		Pick<Entity.User, "email" | "password" | "nickname">;

	export type SessionCreateProps = Pick<Entity.User, "email" | "password">;

	export type ItineraryCreateProps = {
		title: string;
		personnel: number;
		departureDate: Date;
		arrivalDate: Date;
	};
	export type ItineraryUpdateProps = {
		slug: string;
		title: string;
		description?: string;
		body?: string;
		stories?: [];
		tags?: [];
		// state?: ItineraryState;
		personnel: number;
		departureDate: Date;
		arrivalDate: Date;
	};
	export type StoryCreateProps = {
		itinerarySlug: string;
		type: ENUMS.StoryType;
		title: string;
		description: string;
		body: string;
		startTime: Date;
		endTime: Date;
		startPoint: string;
		destination: string;
	};
}
