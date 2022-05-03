import { useMutation } from "react-query";

import { Types, Itinerary } from "@backpackerz/core";

export default function useItineraryMutate() {
	return useMutation((newItinerary: Types.Itinerary) =>
		Itinerary.service.updateItinerary(newItinerary),
	);
}
