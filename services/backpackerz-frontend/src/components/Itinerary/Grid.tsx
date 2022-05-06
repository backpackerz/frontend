import * as React from "react";
import styled from "@emotion/styled";

import ItineraryCard, { Props as ItineraryCardProps } from "./Card";
import { BPStyle } from "@backpackerz/components";

export default function ItineraryGrid(props: {
	items: (ItineraryCardProps & { key: string | number })[];
}) {
	const { items } = props;

	const GridItems = React.useMemo(
		() =>
			items.map((item) => (
				<Wrapper key={item.key}>
					<ItineraryCard
						href={item.href}
						heading={item.heading}
						description={item.description}
						body={item.body}
						author={item.author}
						updatedAt={item.updatedAt}
					/>
				</Wrapper>
			)),
		[items],
	);

	return <Grid>{GridItems}</Grid>;
}

const Wrapper = styled.div`
	padding: 1rem;
	transition: none !important;
`;

const Grid = styled.div`
	display: grid;
	${BPStyle.utils.mediaQuery("xs", "md")} {
		grid-template-columns: repeat(1, 1fr);
	}
	${BPStyle.utils.mediaQuery("md", "lg")} {
		grid-template-columns: repeat(1, 1fr);
	}
	${BPStyle.utils.mediaQuery("lg", "xl")} {
		grid-template-columns: repeat(2, 1fr);
	}
	${BPStyle.utils.mediaQuery("xl", "xxl")} {
		grid-template-columns: repeat(2, 1fr);
	}
	${BPStyle.utils.mediaQuery("xxl", "xxxl")} {
		grid-template-columns: repeat(3, 1fr);
	}
`;
