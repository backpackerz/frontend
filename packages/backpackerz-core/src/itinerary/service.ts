import * as Api from "./request.api";
import { Entity, ItineraryCreateProps } from "@backpackerz/core/index.d";

export default class ItineraryService {
	static async createItinerary(itinerary: ItineraryCreateProps) {
		const result = await Api.createItinerary(itinerary);

		return result;
	}
	static async updateItinerary(itinerary: Entity.Itinerary) {
		const result = await Api.updateItinerary(itinerary);

		return result;
	}
	static async getItineraries() {
		const result = await Api.getItineraries();

		return result;
	}
	static async getItineraryDetail(slug: string) {
		const result = await Api.getItineraryDetail(slug);

		return result;
	}
}
