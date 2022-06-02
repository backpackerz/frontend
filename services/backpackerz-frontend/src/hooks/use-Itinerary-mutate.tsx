import { useMutation } from "react-query";

import { Itinerary } from "@backpackerz/core";
import type { BackpackerzTypes } from "@backpackerz/core";

export default function useItineraryMutate() {
	return useMutation((newItinerary: BackpackerzTypes.Itinerary) => {
		return Itinerary.service.updateItinerary(newItinerary);
	});
}
