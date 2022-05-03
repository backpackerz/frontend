import * as React from "react";
import styled from "@emotion/styled";

import { palette } from "../../styles/palette";

export type Props = Omit<
	React.ComponentPropsWithoutRef<"textarea">,
	"onChange"
> & {
	onChange?: (value: string) => void;
};

export default function Textarea(props: Props) {
	const { onChange, ...htmlProps } = props;
	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		onChange && onChange(event.target.value);
	};
	return <TextareaBlock onChange={handleChange} {...htmlProps} />;
}

const TextareaBlock = styled.textarea`
	padding: 0.8rem 0.6rem;
	border: 1px solid ${palette.gray3};
	border-radius: 0.4rem;
	outline: none;
	resize: none;
	font-size: 1.4rem;
	&,
	&:focus {
		background-color: ${palette.gray1} !important;
	}
	&:hover,
	&:focus {
		border: 1px solid ${palette.gray5};
		transition: border 0.2s;
	}
	&:-webkit-autofill,
	&:-webkit-autofill:hover,
	&:-webkit-autofill:focus,
	&:-webkit-autofill:active {
		transition: background-color 5000s ease-in-out 0s;
	}
	&::placeholder {
		color: ${palette.gray5};
		font-weight: 600;
	}
`;
