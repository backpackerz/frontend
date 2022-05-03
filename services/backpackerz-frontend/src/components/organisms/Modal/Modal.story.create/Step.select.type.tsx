import React from "react";
import styled from "@emotion/styled";

import { Button } from "@backpackerz/components";

type Props = {
	onChange: (v: [key: string, value: string]) => unknown;
};

export default function StepType(props: Props) {
	const { onChange } = props;

	const handleClick = (value: string) => () => onChange(["type", value]);

	return (
		<Step>
			<Button onClick={handleClick("Transit")}>교통</Button>
			<Button onClick={handleClick("Spot")}>장소</Button>
		</Step>
	);
}

const Step = styled.div`
	display: flex;
	flex-direction: column;
	button + button {
		margin-top: 1rem;
	}
`;
