import * as React from "react";
import styled from "@emotion/styled";
import { RenderElementProps } from "slate-react";

import { HeadingElement } from "../../@types";

export type Props = React.PropsWithChildren<
	Pick<RenderElementProps, "attributes"> & {
		level: HeadingElement["level"];
	}
>;

function Element({ attributes, children, level }: Props) {
	return (
		<ElementBlock as={`h${level}`} {...attributes}>
			{children}
		</ElementBlock>
	);
}
const ElementBlock = styled.h1`
	font-size: ${(props) => {
		switch (props.as) {
			case "h1":
				return "2rem";
			case "h2":
				return "1.8rem";
			case "h3":
				return "1.6rem";
			case "h4":
				return "1.4rem";
			case "h5":
				return "1.2rem";
			case "h6":
				return "1.8rem";
		}
	}};
`;
export { Element };
