import * as React from "react";
import styled from "@emotion/styled";

import { Types } from "@backpackerz/core";
import ErrorBoundary from "components/ErrorBoundary";
import Grid from "components/molecules/Grid";

export type Props = {
	heading: string;
	itineraries: Types.Itinerary[];
};

export default function ItineraryGrid(props: Props) {
	const { heading, itineraries } = props;

	return (
		<ErrorBoundary>
			<WrapperBlock>
				<Inner>
					<Heading>{heading}</Heading>
					<Grid.Itinerary
						items={itineraries.map((itinerary) => {
							return {
								href: `/itinerary/${itinerary.slug}`,
								heading: itinerary.title,
								description: itinerary.description,
								body: itinerary.body,
								author: itinerary.user.nickname,
								updatedAt: itinerary.updatedAt,
								key: itinerary.id,
							};
						})}
					/>
				</Inner>
			</WrapperBlock>
		</ErrorBoundary>
	);
}

const Heading = styled.h2`
	margin: 6rem 2rem 2rem 0.8rem;
	font-size: 2rem;
	letter-spacing: 0.4rem;
`;

const Inner = styled.div`
	margin: -1rem;
`;

const WrapperBlock = styled.div`
	padding: 0 2.8rem;
`;
