import axios from "../http";
import { ItineraryType } from "./type.d";
import { itineraryTranslator } from "./request.translator";

export async function createItinerary(
	itinerary: ItineraryType.ItineraryCreateProps,
) {
	const { data } = await axios.post<{
		itinerary: ItineraryType.Itinerary;
	}>("/itineraries", itinerary);

	return itineraryTranslator(data.itinerary);
}

export async function updateItinerary(itinerary: ItineraryType.Itinerary) {
	const { data } = await axios.patch<{
		itinerary: ItineraryType.Itinerary;
	}>(`/itineraries/${itinerary.slug}`, {
		title: itinerary.title,
		description: itinerary.description,
		body: itinerary.body,
		stories: itinerary.stories,
		tags: itinerary.tags,
		personnel: itinerary.personnel,
		departureDate: itinerary.departureDate,
		arrivalDate: itinerary.arrivalDate,
	});

	return itineraryTranslator(data.itinerary);
}

export async function getItineraries() {
	const { data } = await axios.get<{
		itineraries: ItineraryType.Itinerary[];
	}>("/itineraries/list");

	return data.itineraries.map((itinerary) => itineraryTranslator(itinerary));
}

export async function getItineraryDetail(slug: string) {
	const { data } = await axios.get<{
		itinerary: ItineraryType.Itinerary;
	}>(`/itineraries/${slug}`);

	return itineraryTranslator(data.itinerary);
}
