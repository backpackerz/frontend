import * as React from "react";
import styled from "@emotion/styled";
import differenceInMinutes from "date-fns/differenceInMinutes";
import range from "lodash/range";
import round from "lodash/round";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

import type { Timetable } from "@backpackerz/components/types";

const TIME_STEP = 0.5;
export const renderEventSlots = ({
	date,
	hoursInterval,
	rowHeight,
	renderSlot,
	onClickSlot = () => undefined,
}: Timetable.EventSlotListProps) => {
	const handleClickEventSlot = (hour: Number) => () => {
		const isHalf = Boolean(Number(hour) % 1);
		const startHours: Parameters<typeof date.setHours> = isHalf
			? [Number(hour), 30]
			: [Number(hour), 0];
		const endHours: Parameters<typeof date.setHours> = isHalf
			? [Number(hour) + 1, 0]
			: [Number(hour), 30];
		onClickSlot({
			start: new Date(date.setHours(...startHours)),
			end: new Date(date.setHours(...endHours)),
		});
	};
	const render = range(hoursInterval.from, hoursInterval.to, TIME_STEP).map(
		(hour: number) => {
			return renderSlot({
				date,
				hour: hour.toString(),
				defaultAttributes: {
					onClick: handleClickEventSlot(hour),
					style: { height: `${rowHeight / 2}vh` },
				},
			});
		},
	);
	return render;
};

const getEventPositionStyles = ({
	event,
	hoursInterval,
	rowHeight,
}: {
	event: Timetable.Event;
	hoursInterval: Timetable.HoursInterval;
	rowHeight: number;
}) => {
	let startOfDay = setMinutes(
		setHours(event.startTime, hoursInterval.from),
		0,
	);

	let minutesFromStartOfDay = round(
		differenceInMinutes(event.startTime, startOfDay),
	);

	let minutes = round(differenceInMinutes(event.endTime, event.startTime));
	return {
		top: 0,
		height: (minutes * rowHeight) / 60 + "vh",
		marginTop: (minutesFromStartOfDay * rowHeight) / 60 + "vh",
	};
};

const renderEvents = ({
	events,
	day,
	hoursInterval,
	rowHeight,
	renderEvent,
	onClickEvent,
	index,
}: Timetable.EventsListProps) => {
	const handleClickEvent = (event: Timetable.Event) => () => {
		onClickEvent && onClickEvent({ event });
	};
	const render = (events[index] || []).map((event) =>
		renderEvent({
			event,
			defaultAttributes: {
				onClick: handleClickEvent(event),
				style: getEventPositionStyles({
					event,
					hoursInterval,
					rowHeight,
				}),
			},
		}),
	);
	return render;
};

const DayColumn = ({
	label,
	events,
	day,
	eachDays,
	rowHeight,
	renderEvent,
	renderSlot,
	hoursInterval,
	onClickSlot,
	onClickEvent,
	index,
}: Timetable.DayColumnProps) => (
	<DayColumnBlock rowHeight={rowHeight} dayLength={eachDays.length}>
		<Title rowHeight={rowHeight}>{label}</Title>
		<Column>
			{renderEventSlots({
				date: eachDays[index],
				hoursInterval,
				rowHeight,
				renderSlot,
				onClickSlot,
			})}
			{renderEvents({
				events,
				day,
				renderEvent,
				hoursInterval,
				rowHeight,
				onClickEvent,
				index,
			})}
		</Column>
	</DayColumnBlock>
);

const DayColumnBlock = styled.div<{
	rowHeight: Timetable.DayColumnProps["rowHeight"];
	dayLength: number;
}>`
	background-size: ${(props) => `1px ${2.5 * props.rowHeight}vh`};
	min-width: 300px;
	width: ${(props) => `calc(100%  / ${props.dayLength})`};
	float: left;
	background-color: #fff;
	background-image: linear-gradient(rgba(0, 0, 0, 0.08) 50%, transparent 50%);
`;
const Title = styled.div<{
	rowHeight: Timetable.DayColumnProps["rowHeight"];
}>`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 1rem;
	background-color: #34495e;
	font-size: 0.7rem;
	font-weight: 600;
	text-transform: uppercase;
	text-align: center;
	z-index: 2;
`;
const Column = styled.div`
	position: relative;
`;
export { DayColumn };
