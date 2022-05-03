import * as React from "react";
import styled from "@emotion/styled";

export type Props = React.ComponentPropsWithoutRef<"label">;

export default function Label(props: Props) {
	const { children, ...htmlProps } = props;
	return <LabelBlock {...htmlProps}>{children}</LabelBlock>;
}

const LabelBlock = styled.label`
	font-size: 1.4rem;
`;
