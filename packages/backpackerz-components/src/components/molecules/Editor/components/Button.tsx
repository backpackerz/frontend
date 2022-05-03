import * as React from "react";
import styled from "@emotion/styled";

type Props = React.PropsWithChildren<React.HTMLProps<HTMLButtonElement> & {}>;

const defaultProps: Required<{}> = {};

export default function Button(props: Props) {
	const { children, onClick, ...htmlProps } = { ...defaultProps, ...props };
	const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
		onClick && onClick(event);
		(event.target as HTMLButtonElement).blur();
	};
	return (
		<ButtonBlock onClick={handleClick} {...(htmlProps as any)}>
			{children}
		</ButtonBlock>
	);
}

const ButtonBlock = styled.button`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	height: 2.4rem;
	padding-top: 0;
	padding-left: 1.25rem;
	padding-right: 1.25rem;
	font-size: 1.2rem;

	border: none;
	border-radius: 0.4rem;

	cursor: pointer;

	background: #343a40;
	color: #ffffff;
	&:hover,
	&:focus {
		background: #868e96;
	}
	transition: background 0.2s;
`;
