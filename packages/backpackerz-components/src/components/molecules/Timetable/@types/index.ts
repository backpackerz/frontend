import * as React from "react";
import { DEFAULT_HOURS_INTERVAL } from "./constants";

export type Day = Event[];

export type Event = {
	id: number | string;
	title: string;
	startTime: Date;
	endTime: Date;
	type: string;
	description: string;
	body: string;
	[key: string]: unknown;
};

export type Events = Day[];

export type HourLableProps = {
	timeLabel: string;
	hoursInterval: {
		from: number;
		to: number;
	};
	renderHour: any;
	rowHeight: number;
};

export type EventSlotPreviewProps = {
	className?: string;
	date: Date;
	hour: string;
	defaultAttributes: React.HTMLAttributes<HTMLDivElement>;
};

export type HourPreviewProps = {
	hour: string;
	defaultAttributes: React.HTMLAttributes<HTMLDivElement>;
};

export type EventPreviewProps = {
	event: Event;
	defaultAttributes: React.HTMLAttributes<HTMLDivElement>;
};

export type EventsListProps = {
	day: Day;
	events: Events;
	renderEvent: React.FC<EventPreviewProps>;
	hoursInterval: typeof DEFAULT_HOURS_INTERVAL;
	rowHeight: number;
	onClickEvent?: OnClickEvent;
	index: number;
};

export type OnClickSlot = ({
	start,
	end,
}: {
	start: Date;
	end: Date;
}) => unknown;

export type OnClickEvent = ({ event }: { event: Event }) => unknown;

export type DayColumnProps = {
	label: string;
	events: Events;
	eachDays: Date[];
	day: Day;
	rowHeight: number;
	renderEvent: React.FC<EventPreviewProps>;
	renderSlot: React.FC<EventSlotPreviewProps>;
	hoursInterval: typeof DEFAULT_HOURS_INTERVAL;
	onClickSlot?: OnClickSlot;
	onClickEvent?: OnClickEvent;
	index: number;
};

export type EventSlotListProps = {
	date: Date;
	hoursInterval: typeof DEFAULT_HOURS_INTERVAL;
	rowHeight: number;
	renderSlot: React.FC<EventSlotPreviewProps>;
	onClickSlot?: OnClickSlot;
};

export type HoursListProps = {
	hoursInterval: typeof DEFAULT_HOURS_INTERVAL;
	rowHeight: number;
	renderHour: React.FC<HourPreviewProps>;
};

export type TimeTableProps = {
	className?: string;
	timeLabel?: string;
	departureDate: Date;
	arrivalDate: Date;
	hoursInterval?: typeof DEFAULT_HOURS_INTERVAL;
	events: Events;
	renderSlot?: React.FC<EventSlotPreviewProps>;
	renderEvent?: React.FC<EventPreviewProps>;
	renderHour?: React.FC<HourPreviewProps>;
	onClickSlot?: OnClickSlot;
	onClickEvent?: OnClickEvent;
};
