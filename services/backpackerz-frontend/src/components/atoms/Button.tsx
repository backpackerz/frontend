import * as React from "react";
import styled from "@emotion/styled";

import { ButtonColorTypes, buttonTheme } from "styles/theme";

export type Props = React.ComponentPropsWithoutRef<"button"> & {
	color?: ButtonColorTypes;
	shape?: "button" | "text";
};

export default function Button(props: Props) {
	const {
		children,
		color = "darkGray",
		shape = "button",
		onClick,
		...htmlProps
	} = props;
	const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
		onClick && onClick(event);
	};
	return (
		<ButtonBlock
			color={color}
			shape={shape}
			onClick={handleClick}
			{...htmlProps}
		>
			{children}
		</ButtonBlock>
	);
}

const ButtonBlock = styled.button<
	Required<{
		color: ButtonColorTypes;
		shape: Props["shape"];
	}>
>`
	display: inline-flex;
	height: 3.4rem;
	min-width: 7.6rem;
	border: 0;
	outline: none;

	align-items: center;
	justify-content: center;
	padding-top: 0;
	padding-left: 1.25rem;
	padding-right: 1.25rem;
	font-size: 1.4rem;
	word-break: keep-all;
	cursor: pointer;
	transition: background 0.2s;
	${(props) =>
		props.shape === "button" &&
		`
			border-radius: 0.4rem;
			${buttonTheme(props.color)}
		`}
	${(props) =>
		props.shape === "text" &&
		`
			background: transparent;
			&:focus {
			}
		`}
`;
