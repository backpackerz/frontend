import React from "react";
import styled from "@emotion/styled";

import { Button } from "@backpackerz/components";

type Props = {
	onChange: (v: [key: string, value: string]) => unknown;
};

export default function StepType(props: Props) {
	const { onChange } = props;

	const handleClick = (value: string) => () => onChange(["transit", value]);

	return (
		<Step>
			<Button onClick={handleClick("Air")}>비행기</Button>
			<Button onClick={handleClick("Train")}>기차</Button>
			<Button onClick={handleClick("Metro")}>지하철</Button>
			<Button onClick={handleClick("Bus")}>버스</Button>
			<Button onClick={handleClick("Walk")}>도보</Button>
			<Button onClick={handleClick("Taxi")}>택시</Button>
			<Button onClick={handleClick("Ship")}>배</Button>
			<Button onClick={handleClick("Car")}>차</Button>
			<Button onClick={handleClick("Etc")}>기타</Button>
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
