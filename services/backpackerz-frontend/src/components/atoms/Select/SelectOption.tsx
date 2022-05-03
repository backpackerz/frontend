import React from "react";
import styled from "@emotion/styled";

export type OptionType = {
	value: any;
	label: string;
};

export type Props = Omit<React.HTMLProps<HTMLLIElement>, "as" | "value"> &
	OptionType & {
		className?: string;
		isFocus: boolean;
	};

const defaultProps: Required<{}> = {};

export default function SelectOption(props: Props) {
	const { value, label, isFocus, ...htmlProps } = {
		...defaultProps,
		...props,
	};
	return (
		<SelectOptionBlock
			value={value}
			isFocus={isFocus}
			role="option"
			{...(htmlProps as any)}
		>
			{label}
		</SelectOptionBlock>
	);
}
const SelectOptionBlock = styled.li<{
	isFocus: Pick<Props, "isFocus">;
}>`
	margin: 0.2rem 0;
	padding: 0.6rem 2rem 0.6rem 0;
	font-size: 1.4rem;
	text-align: right;
	list-style: none;
	user-select: none;
	background-color: ${(props) => props.isFocus && props.theme.palette.gray2};
	transition: background-color 0.2s;
`;
