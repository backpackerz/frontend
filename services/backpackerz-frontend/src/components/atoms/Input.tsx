import * as React from "react";
import styled from "@emotion/styled";

import { inputTheme } from "styles/theme";

export type Props = Omit<
	React.ComponentPropsWithoutRef<"input">,
	"onChange"
> & {
	className?: string;
	onChange?: (value: string) => unknown;
};

export default function Input(props: Props) {
	const { onChange, ...htmlProps } = props;
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange && onChange(event.target.value);
	};
	return <InputBlock onChange={handleChange} {...htmlProps} />;
}

const InputBlock = styled.input`
	height: 3.4rem;
	min-width: 7.6rem;
	border: 0;
	border-radius: 0.4rem;
	outline: none;
	&:-webkit-autofill,
	&:-webkit-autofill:hover,
	&:-webkit-autofill:focus,
	&:-webkit-autofill:active {
		transition: background-color 5000s ease-in-out 0s;
	}
	${inputTheme()}
`;
