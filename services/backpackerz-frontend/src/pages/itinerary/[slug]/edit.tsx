import * as React from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

import EmptiedLayout from "components/layouts/EmpiedLayout";
import ItineraryEditTemplate from "components/templates/Itinerary/EditTemplate";
import useItinerary, { useItineraryServer } from "hooks/use-Itinerary";
import { wrapper } from "modules";
import ErrorBoundary from "components/ErrorBoundary";
import { QueryErrorResetBoundary } from "react-query";

export const getServerSideProps = wrapper.getServerSideProps(
	() => async (context: GetServerSidePropsContext<{ slug?: string }>) => {
		const { params } = context;
		if (!params?.slug) return { notFound: true } as const;

		const { dehydratedState, state } = await useItineraryServer(
			params.slug,
		);

		if (!state.data?.isOwn) {
			return {
				redirect: {
					permanent: false,
					destination: "/",
				},
				props: {},
			} as const;
		}

		return {
			props: {
				...dehydratedState,
			},
		};
	},
);

export default function Page(props: inferSSRProps<typeof getServerSideProps>) {
	const router = useRouter();
	const {
		data: itinerary,
		isError,
		isSuccess,
	} = useItinerary(router.query.slug);

	const render = () => {
		if (isError) {
			return <div></div>;
		}
		if (isSuccess && itinerary) {
			return (
				<QueryErrorResetBoundary>
					{({ reset }) => (
						<ErrorBoundary
							onReset={reset}
							fallbackRender={({ resetErrorBoundary }) => (
								<>err...</>
							)}
						>
							<ItineraryEditTemplate itinerary={itinerary} />
						</ErrorBoundary>
					)}
				</QueryErrorResetBoundary>
			);
		}
	};

	return render();
}

Page.getLayout = function getLayout(page: React.ReactElement) {
	return <EmptiedLayout>{page}</EmptiedLayout>;
};
