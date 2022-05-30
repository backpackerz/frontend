import * as React from "react";
import { GetServerSidePropsContext } from "next";
import { connect } from "react-redux";

import { wrapper } from "modules";
import EmptiedLayout from "components/layouts/EmpiedLayout";
import ItineraryEditTemplate from "components/templates/Itinerary/EditTemplate";
import { useRouter } from "next/router";
import useItinerary, { useItineraryServer } from "hooks/use-Itinerary";
import useItineraryMutate from "hooks/use-Itinerary-mutate";

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

function Page(props: inferSSRProps<typeof getServerSideProps>) {
	const router = useRouter();
	const { data, isSuccess, isError } = useItinerary(router.query.slug);
	const mutation = useItineraryMutate();

	const [itinerary, setItinerary] = React.useState(data);

	const handleClickSave = async () => {
		itinerary && mutation.mutate(itinerary);
	};
	const renderResult = () => {
		if (isError) {
			return <div></div>;
		}
		if (isSuccess && itinerary) {
			return (
				<ItineraryEditTemplate
					itinerary={itinerary}
					onChange={setItinerary}
					onClickSave={handleClickSave}
				/>
			);
		}
	};

	return <>{renderResult()}</>;
}

Page.getLayout = function getLayout(page: React.ReactElement) {
	return <EmptiedLayout>{page}</EmptiedLayout>;
};

export default connect((state) => state)(Page);
