import * as React from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

import { wrapper } from "modules";
import DefaultLayout from "components/global/layouts/default";
import ItineraryViewTemplate from "components/Itinerary/template/View";
import useItinerary, { useItineraryServer } from "hooks/use-Itinerary";

export const getServerSideProps = wrapper.getServerSideProps(
	() => async (context: GetServerSidePropsContext<{ slug?: string }>) => {
		const { params } = context;
		if (!params?.slug) return { notFound: true } as const;

		const { dehydratedState } = await useItineraryServer(params.slug);

		return {
			props: {
				...dehydratedState,
			},
		};
	},
);

export default function Page(props: inferSSRProps<typeof getServerSideProps>) {
	const router = useRouter();
	const slug = router.query.slug;
	const { data, isSuccess, isError } = useItinerary(slug as string);

	const renderResult = () => {
		if (isError) {
			return <div></div>;
		}
		if (isSuccess) {
			return <ItineraryViewTemplate itinerary={data} />;
		}
	};

	return <>{renderResult()}</>;
}

Page.getLayout = function getLayout(page: React.ReactElement) {
	return <DefaultLayout>{page}</DefaultLayout>;
};
