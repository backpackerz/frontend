import * as React from "react";
import { wrapper } from "modules";
import DefaultLayout from "components/global/layouts/default";
import HomeTemplate from "components/main/template/Home";
import useItineraries, { useItinerariesServer } from "hooks/use-Itineraries";

export const getServerSideProps = wrapper.getServerSideProps(() => async () => {
	const { dehydratedState } = await useItinerariesServer();
	return {
		props: {
			...dehydratedState,
		},
	};
});

export default function Page(props: inferSSRProps<typeof getServerSideProps>) {
	const { data, isSuccess, isError } = useItineraries();

	const renderResult = () => {
		if (isError) {
			return <div></div>;
		}
		if (isSuccess) {
			return (
				<HomeTemplate
					sections={[
						{ heading: "여행일정1", itineraries: data },
						{ heading: "여행일정2", itineraries: data },
						{ heading: "여행일정3", itineraries: data },
					]}
				/>
			);
		}
	};

	return <>{renderResult()}</>;
}

Page.getLayout = function getLayout(page: React.ReactElement) {
	return <DefaultLayout>{page}</DefaultLayout>;
};
