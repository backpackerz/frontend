import { Descendant, Text } from "slate";

export const serialize = (nodes: Descendant[]) => {
	const serializeNode = (node: any) => {
		if (Text.isText(node)) {
			let string = node.text;
			if (node.bold) {
				string = `<strong>${string}</strong>`;
			}
			return string;
		}
		const children = node.children
			.map((n: any) => serializeNode(n))
			.join("");
		switch (node.type) {
			case "paragraph":
				return `<p>${children}</p>`;
			case "heading":
				return `<h${node.level}>${children}</h${node.level}>`;
			case "code":
				return `<pre>${children}</pre>`;
			default:
				return `<p>${children}</p>`;
		}
	};
	return nodes.map((node) => serializeNode(node)).join("\n");
};
