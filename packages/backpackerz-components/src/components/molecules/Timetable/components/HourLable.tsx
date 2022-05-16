import * as React from "react";
import styled from "@emotion/styled";
import range from "lodash/range";

import type { Timetable } from "@backpackerz/components/types";

export const HoursList = ({
	hoursInterval,
	rowHeight,
	renderHour,
}: Timetable.HoursListProps) => {
	return range(hoursInterval.from, hoursInterval.to).map((hour: number) =>
		renderHour({
			hour: `${hour}:00`,
			defaultAttributes: {
				style: { height: `${rowHeight}vh` },
			},
		}),
	);
};

const HourLable: React.FC<Timetable.HourLableProps> = ({
	timeLabel,
	hoursInterval,
	renderHour,
	rowHeight,
}) => (
	<HourLableBlock>
		<Title rowHeight={rowHeight}>{timeLabel}</Title>
		{HoursList({ hoursInterval, rowHeight, renderHour })}
	</HourLableBlock>
);

const HourLableBlock = styled.div`
	position: relative;
	background-color: #ffffff;
	background-image: linear-gradient(rgba(0, 0, 0, 0.08) 50%, transparent 50%);
	float: left;
`;
const Title = styled.div<{
	rowHeight: Timetable.HourLableProps["rowHeight"];
}>`
	display: flex;
	justify-content: center;
	flex-direction: column;
	padding: 1rem;
	background-color: #34495e;
	font-size: 0.7rem;
	font-weight: 600;
	text-transform: uppercase;
	text-align: center;
	z-index: 2;
`;
export { HourLable };
