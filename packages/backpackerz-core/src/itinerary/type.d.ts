export namespace ItineraryType {
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
		state: ItineraryState;
		tags: string[];
		comments: string[];
		favoritesCount: number;
		createdAt: Date;
		updatedAt: Date;
		user: InstanceType<typeof User>;
		stories: Story[];
		isOwn: boolean;
	};
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
}
