import { CodeElement, DefaultElement, HeadingElement } from "../@types";
import { Editor, Element, Transforms, Text } from "slate";

export const isBoldMarkActive = (editor: Editor) => {
	const [match] = Editor.nodes(editor, {
		match: (n) =>
			Text.matches(n as Text, {
				bold: true,
			}),
		universal: true,
	});

	return !!match;
};

export const isCodeBlockActive = (editor: Editor) => {
	const [match] = Editor.nodes(editor, {
		match: (n) => Element.isElementType(n, "code"),
	});

	return !!match;
};

export const isHeadingBlockActive = (
	editor: Editor,
	level: HeadingElement["level"],
) => {
	const [match] = Editor.nodes(editor, {
		match: (n) => {
			return (
				Element.isElementType(n, "heading") &&
				Element.matches(n as Element, {
					level,
				})
			);
		},
	});

	return !!match;
};

export const toggleBoldMark = (editor: Editor) => {
	const isActive = isBoldMarkActive(editor);
	Transforms.setNodes(
		editor,
		{ bold: isActive ? null : true },
		{ match: (n) => Text.isText(n), split: true },
	);
};

export const toggleCodeBlock = (editor: Editor) => {
	const isActive = isCodeBlockActive(editor);
	Transforms.setNodes<DefaultElement | CodeElement>(
		editor,
		{ type: isActive ? "paragraph" : "code" },
		{ match: (n) => Editor.isBlock(editor, n) },
	);
};

export const toggleHeadingBlock = (
	editor: Editor,
	level: HeadingElement["level"],
) => {
	const isActive = isHeadingBlockActive(editor, level);
	Transforms.setNodes<DefaultElement | HeadingElement>(
		editor,
		{ type: isActive ? "paragraph" : "heading", level },
		{ match: (n) => Editor.isBlock(editor, n) },
	);
};
