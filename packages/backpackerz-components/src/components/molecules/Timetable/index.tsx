import * as React from "react";
import styled from "@emotion/styled";
import round from "lodash/round";
import format from "date-fns/format";
import eachDayOfInterval from "date-fns/eachDayOfInterval";

import { EventSlotPreview } from "./components/renders/EventSlotPreview";
import { EventPreview } from "./components/renders/EventPreview";
import { HourPreview } from "./components/renders/HourPreview";
import { HourLable } from "./components/HourLable";
import { DayColumn } from "./components/DayColumn";
import { DEFAULT_HOURS_INTERVAL } from "./@types/constants";
import { TimeTableProps } from "./@types";

const getRowHeight = (from: number, to: number) => {
	const numberOfRows = to - from + 1;

	return round(280 / numberOfRows, 5);
};

export const TimeTable = ({
	className,
	departureDate,
	arrivalDate,
	hoursInterval = DEFAULT_HOURS_INTERVAL,
	events,
	timeLabel = "Day",
	renderSlot = EventSlotPreview,
	renderEvent = EventPreview,
	renderHour = HourPreview,
	onClickSlot,
	onClickEvent,
}: TimeTableProps) => {
	const [eachDays, setEachDays] = React.useState(
		eachDayOfInterval({
			start: new Date(departureDate),
			end: new Date(arrivalDate),
		}),
	);
	const [rowHeight, setRowHeight] = React.useState<number>(0);

	React.useEffect(() => {
		setEachDays(
			eachDayOfInterval({
				start: new Date(departureDate),
				end: new Date(arrivalDate),
			}),
		);
	}, [departureDate, arrivalDate]);

	React.useEffect(() => {
		setRowHeight(getRowHeight(hoursInterval.from, hoursInterval.to));
	}, [hoursInterval]);

	return (
		<TimetableBlock className={className}>
			<HourLable
				timeLabel={timeLabel}
				hoursInterval={hoursInterval}
				rowHeight={rowHeight}
				renderHour={renderHour}
			/>
			<DayColumnWrapper>
				{eachDays.map((day, index) => (
					<DayColumn
						label={format(day, "yyyy MMMM dd")}
						hoursInterval={hoursInterval}
						eachDays={eachDays}
						events={events}
						day={events[index]}
						rowHeight={rowHeight}
						renderSlot={renderSlot}
						renderEvent={renderEvent}
						onClickSlot={onClickSlot}
						onClickEvent={onClickEvent}
						index={index}
						key={`${day}-${index}`}
					/>
				))}
			</DayColumnWrapper>
		</TimetableBlock>
	);
};
const DayColumnWrapper = styled.div`
	display: flex;
	overflow: scroll;
`;
const TimetableBlock = styled.div`
	margin: 0;
	font-family: "Open Sans", sans-serif;
	color: #efefef;
`;

export default TimeTable;
