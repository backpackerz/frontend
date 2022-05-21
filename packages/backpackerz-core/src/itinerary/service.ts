import {
	createItinerary,
	updateItinerary,
	getItineraryDetail,
	getItineraries,
} from "./request.api";
import { Entity, ItineraryCreateProps } from "@backpackerz/core/index.d";

export default class ItineraryService {
	static async createItinerary(itinerary: ItineraryCreateProps) {
		const itinerary_2 = await createItinerary(itinerary);
		return itinerary_2;
	}
	static async updateItinerary(itinerary: Entity.Itinerary) {
		const itinerary_2 = await updateItinerary(itinerary);
		return itinerary_2;
	}
	static async getItineraries() {
		const itineraries = await getItineraries();
		return itineraries;
	}
	static async getItineraryDetail(slug: string) {
		const itinerary = await getItineraryDetail(slug);
		return itinerary;
	}
}
