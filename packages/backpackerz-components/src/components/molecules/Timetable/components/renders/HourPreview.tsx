import * as React from "react";
import styled from "@emotion/styled";

import { HourPreviewProps } from "../../@types";

const HourPreview: React.FC<HourPreviewProps> = ({
	hour,
	defaultAttributes,
}) => (
	<HourPreviewBlock {...defaultAttributes} key={hour}>
		{hour}
	</HourPreviewBlock>
);

const HourPreviewBlock = styled.div`
	width: 5rem;
	padding: 4% 0;
	background-color: rgba(52, 73, 94, 0.9);
	font-size: 12px;
	text-align: center;
`;
export { HourPreview };
