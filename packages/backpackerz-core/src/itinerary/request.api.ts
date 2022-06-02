import axios from "../http";
import { itineraryTranslator } from "./request.translator";
import {
	Entity,
	ItineraryCreateProps,
	ItineraryUpdateProps,
} from "@backpackerz/core/index.d";

export async function createItinerary(itinerary: ItineraryCreateProps) {
	const { data } = await axios.post<{
		itinerary: Entity.Itinerary;
	}>("/itineraries", itinerary);

	return itineraryTranslator(data.itinerary);
}

export async function updateItinerary(itinerary: ItineraryUpdateProps) {
	const { data } = await axios.patch<{
		itinerary: Entity.Itinerary;
	}>(`/itineraries/${itinerary.slug}`, {
		title: itinerary.title,
		description: itinerary.description,
		body: itinerary.body,
		// state: itinerary.state,
		personnel: itinerary.personnel,
		departureDate: itinerary.departureDate,
		arrivalDate: itinerary.arrivalDate,
	});

	return itineraryTranslator(data.itinerary);
}

export async function getItineraries() {
	const { data } = await axios.get<{
		itineraries: Entity.Itinerary[];
	}>("/itineraries/list");

	return data.itineraries.map((itinerary) => itineraryTranslator(itinerary));
}

export async function getItineraryDetail(slug: string) {
	const { data } = await axios.get<{
		itinerary: Entity.Itinerary;
	}>(`/itineraries/${slug}`);

	return itineraryTranslator(data.itinerary);
}
