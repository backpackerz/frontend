import { dehydrate, QueryClient, useQuery } from "react-query";

import { Itinerary } from "@backpackerz/core";

const KEY = "itineraries";

const fetcher = () => Itinerary.service.getItineraries();

export async function useItinerariesServer() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery([KEY], fetcher);
	return {
		dehydratedState: {
			dehydratedState: dehydrate(queryClient),
		},
	};
}

export default function useItineraries() {
	return useQuery([KEY], fetcher, {
		initialData: [],
		keepPreviousData: true,
		staleTime: 60 * 1000 * 5,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		useErrorBoundary: (error: any) => error.response?.status >= 500,
	});
}
