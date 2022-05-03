import { dehydrate, QueryClient, useQuery } from "react-query";

import { Itinerary } from "@backpackerz/core";

const fetcher = (slug: string) => () =>
	Itinerary.service.getItineraryDetail(slug);

export async function useItineraryServer(slug: string) {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery(["itinerary-detail", slug], fetcher(slug));

	return {
		queryClient,
		dehydratedState: {
			dehydratedState: dehydrate(queryClient),
		},
		state: {
			data: queryClient.getQueryState<
				Awaited<ReturnType<typeof Itinerary.service.getItineraryDetail>>
			>(["itinerary-detail", slug])?.data,
		},
	};
}

export default function useItinerary(slug?: string | string[]) {
	return useQuery(["itinerary-detail", slug], fetcher(slug as string), {
		useErrorBoundary: (error: any) => error.response?.status >= 500,
		enabled: !!slug && typeof slug == "string",
	});
}
