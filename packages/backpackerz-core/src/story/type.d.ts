import * as ENUMS from "../variables/enums";
import { UserType } from "../user/type.d";

export namespace StoryType {
	export type Types = keyof typeof ENUMS.StoryType;
	export type Transit = keyof typeof ENUMS.StoryTransits;
	export type Story = {
		id: number;
		slug: string;
		type: StoryType.Types & string;
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
		user: UserType.User;
	};
	export type StoryCreateProps = {
		itinerarySlug: string;
		type: StoryType.Types;
		title: string;
		description: string;
		body: string;
		startTime: Date;
		endTime: Date;
		startPoint: string;
		destination: string;
	};
}
