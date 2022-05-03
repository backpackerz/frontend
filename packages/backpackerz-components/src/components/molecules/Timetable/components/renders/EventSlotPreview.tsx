import * as React from "react";
import cx from "clsx";
import styled from "@emotion/styled";
import useHover from "../../../../../hooks/useHover";

import { EventSlotPreviewProps } from "../../@types";

const EventSlotPreview: React.FC<EventSlotPreviewProps> = ({
	className,
	date,
	hour,
	defaultAttributes,
}) => {
	const [hoverRef, isHovered] = useHover();
	const classNames = cx(className, "event-slot", {
		"event-slot--hover": isHovered,
	});
	return (
		<EventSlotPreviewBlock
			ref={hoverRef}
			className={classNames}
			{...defaultAttributes}
			key={`${date}-${hour}`}
		/>
	);
};

const EventSlotPreviewBlock = styled.div`
	&.event-slot {
		cursor: pointer;
		&--hover {
			background-color: darkgray;
		}
	}
`;
export { EventSlotPreview };
