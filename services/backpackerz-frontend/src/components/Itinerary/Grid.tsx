import * as React from "react";
import styled from "@emotion/styled";

import ItineraryCard, { Props as ItineraryCardProps } from "./Card";
import { mq } from "styles/mediaQuery";

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
	${mq("xs", "md")} {
		grid-template-columns: repeat(1, 1fr);
	}
	${mq("md", "lg")} {
		grid-template-columns: repeat(1, 1fr);
	}
	${mq("lg", "xl")} {
		grid-template-columns: repeat(2, 1fr);
	}
	${mq("xl", "xxl")} {
		grid-template-columns: repeat(2, 1fr);
	}
	${mq("xxl", "xxxl")} {
		grid-template-columns: repeat(3, 1fr);
	}
`;
