import * as React from "react";

import { styled, Button, Input } from "@backpackerz/components";
import type { BackpackerzTypes } from "@backpackerz/core";

type Value = {
	type?: BackpackerzTypes.Story["type"];
	transit?: BackpackerzTypes.Story["transit"];
	title: string;
	description: string;
	startPoint?: string;
	destination?: string;
};

type Props = {
	value: Value;
	onSubmit: () => unknown;
	onChange: (v: [key: string, value: string]) => unknown;
};

export default function StepEditTransit(props: Props) {
	const { value, onSubmit, onChange } = props;

	const handleChange = (key: keyof Value) => (value: string) =>
		onChange([key, value]);

	return (
		<Step>
			<Input
				placeholder="제목"
				value={value.title}
				onChange={handleChange("title")}
			/>
			<Input
				placeholder="요약"
				value={value.description}
				onChange={handleChange("description")}
			/>
			<Input
				placeholder="출발지"
				value={value.startPoint}
				onChange={handleChange("startPoint")}
			/>
			<Input
				placeholder="목적지"
				value={value.destination}
				onChange={handleChange("destination")}
			/>
			<Button onClick={onSubmit}>추가</Button>
		</Step>
	);
}

const Step = styled("div")`
	display: flex;
	flex-direction: column;
	button + button {
		margin-top: 1rem;
	}
`;
