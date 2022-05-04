import * as React from "react";
import { RenderElementProps, RenderLeafProps } from "slate-react";
import Element from "../components/Element";
import Leaf from "../components/Leaf";

const ElementRender = ({
	attributes,
	children,
	element,
}: RenderElementProps) => {
	switch (element.type) {
		case "heading":
			return (
				<Element.Heading attributes={attributes} level={element.level}>
					{children}
				</Element.Heading>
			);
		case "code":
			return (
				<Element.Code attributes={attributes}>{children}</Element.Code>
			);
		default:
			return <Element attributes={attributes}>{children}</Element>;
	}
};

const LeafRender = (props: RenderLeafProps) => {
	return <Leaf {...props} />;
};

export default {
	Element: ElementRender,
	Leaf: LeafRender,
};
