import * as React from "react";

import { Types } from "@backpackerz/core";
import ItinerariesGridSection from "components/Itinerary/GridSection";

type Props = {
	sections: { heading: string; itineraries: Types.Itinerary[] }[];
};

export default function HomeTemplate(props: Props) {
	const { sections } = props;

	return (
		<div>
			{sections.map(({ heading, itineraries }) => {
				return (
					<ItinerariesGridSection
						heading={heading}
						itineraries={itineraries}
						key={heading}
					/>
				);
			})}
		</div>
	);
}
