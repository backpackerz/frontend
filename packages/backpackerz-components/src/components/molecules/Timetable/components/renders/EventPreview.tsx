import * as React from "react";
import styled from "@emotion/styled";
import format from "date-fns/format";

import { EventPreviewProps } from "../../@types";

const EventPreview: React.FC<EventPreviewProps> = ({
	event,
	defaultAttributes,
}) => {
	const formatTime = (startTime: Date, endTime: Date) =>
		`${format(startTime, "HH:mm")} - ${format(endTime, "HH:mm")}`;
	const formattedTime = React.useMemo(
		() => formatTime(event.startTime, event.endTime),
		[event],
	);
	return (
		<EventPreviewBlock
			{...defaultAttributes}
			title={event.title}
			key={event.id}
		>
			<Title>{`${event.type}. ${event.title}`}</Title>
			<Body>
				<Contents>{event.description}</Contents>
				<Time>{formattedTime}</Time>
			</Body>
		</EventPreviewBlock>
	);
};
const EventPreviewBlock = styled.article`
	position: absolute;
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 0.2rem;
	border-radius: 0.4rem;
	background-color: #34495e;
	font-weight: 300;
	overflow: hidden;
`;
const Title = styled.h3`
	height: 1.8rem;
	margin: 0;
	padding: 0.2rem;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	font-size: 1.4rem;
`;
const Body = styled.div`
	flex: 1;
	display: flex;
	height: 1.8rem;
	margin: 4px 0 0 0px;
	padding: 0.4rem;
	font-size: 1rem;
`;
const Contents = styled.div`
	flex: 1;
	text-overflow: ellipsis;
	text-align: left;
	overflow: hidden;
	word-wrap: break-word;
	word-break: break-word;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
`;
const Time = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: flex-end;
`;
export { EventPreview };
