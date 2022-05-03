import React from "react";
import styled from "@emotion/styled";
import { RenderElementProps } from "slate-react";

export type Props = React.PropsWithChildren<
	Pick<RenderElementProps, "attributes">
>;

function Element({ attributes, children }: Props) {
	return <ElementBlock {...attributes}>{children}</ElementBlock>;
}

const ElementBlock = styled.p`
	font-size: 1.2rem;
`;

export { Element };
