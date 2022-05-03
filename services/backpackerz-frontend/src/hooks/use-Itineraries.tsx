import { dehydrate, QueryClient, useQuery } from "react-query";

import { Itinerary } from "@backpackerz/core";

const fetcher = () => Itinerary.service.getItineraries();

export async function useItinerariesServer() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery(["itineraries"], fetcher);
	return {
		dehydratedState: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}

export default function useItineraries() {
	return useQuery(["itineraries"], fetcher, {
		initialData: [],
		staleTime: 60 * 10000,
		keepPreviousData: true,
		useErrorBoundary: (error: any) => error.response?.status >= 500,
	});
}
