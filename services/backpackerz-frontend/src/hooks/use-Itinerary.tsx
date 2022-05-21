import { dehydrate, QueryClient, useQuery } from "react-query";

import { Itinerary } from "@backpackerz/core";

const KEY = "itinerary-detail";

const fetcher = (slug: string) => () =>
	Itinerary.service.getItineraryDetail(slug);

export async function useItineraryServer(slug: string) {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery([KEY, slug], fetcher(slug));

	return {
		queryClient,
		dehydratedState: {
			dehydratedState: dehydrate(queryClient),
		},
		state: {
			data: queryClient.getQueryState<
				Awaited<ReturnType<typeof Itinerary.service.getItineraryDetail>>
			>([KEY, slug])?.data,
		},
	};
}

export default function useItinerary(slug?: string | string[]) {
	return useQuery([KEY, slug], fetcher(slug as string), {
		enabled: !!slug && typeof slug == "string",
		staleTime: 60 * 1000 * 5,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		useErrorBoundary: (error: any) => error.response?.status >= 500,
	});
}
