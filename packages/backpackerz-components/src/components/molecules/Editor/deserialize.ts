import { Descendant } from "slate";
import { Element } from "domhandler/lib/node";
import parser, { HTMLReactParserOptions } from "html-react-parser";

export function parseText(str: string) {
	return (
		parser(str, {
			trim: true,
		}) as JSX.Element[]
	).reduce((prev, curr) => {
		if (curr.props.children && typeof curr.props.children == "string") {
			return prev + curr.props.children;
		}
		return prev;
	}, "");
}

function match(el: JSX.Element) {
	const text = el.props.children || "";
	switch (el.type) {
		case "p":
			return {
				type: "paragraph",
				children: [{ text }],
			} as Descendant;
		case "pre":
			return {
				type: "code",
				children: [{ text }],
			} as Descendant;
		case "h1":
			return {
				type: "heading",
				level: 1,
				children: [{ text }],
			} as Descendant;
		case "h2":
			return {
				type: "heading",
				level: 2,
				children: [{ text }],
			} as Descendant;
		case "h3":
			return {
				type: "heading",
				level: 3,
				children: [{ text }],
			} as Descendant;
		case "h4":
			return {
				type: "heading",
				level: 4,
				children: [{ text }],
			} as Descendant;
		case "h5":
			return {
				type: "heading",
				level: 5,
				children: [{ text }],
			} as Descendant;
		case "h6":
			return {
				type: "heading",
				level: 6,
				children: [{ text }],
			} as Descendant;
		default:
			return {
				type: "paragraph",
				children: [{ text }],
			} as Descendant;
	}
}
export function deserialize(string: string): Descendant[] {
	const options: HTMLReactParserOptions = {
		trim: true,
		replace: (domNode) => {
			if (domNode instanceof Element && domNode.attribs) {
			}
		},
	};
	const doc = parser(string, options);

	if (typeof doc == "string") {
		return [
			{
				type: "paragraph",
				children: [{ text: doc }],
			},
		];
	} else {
		return [doc].flat().map((el) => match(el));
	}
}
