import { Editor as SlateEditor, Element, Transforms, Text } from "slate";

import type { Editor } from "@backpackerz/components/types";

export const isBoldMarkActive = (editor: SlateEditor) => {
	const [match] = SlateEditor.nodes(editor, {
		match: (n) =>
			Text.matches(n as Text, {
				bold: true,
			}),
		universal: true,
	});

	return !!match;
};

export const isCodeBlockActive = (editor: SlateEditor) => {
	const [match] = SlateEditor.nodes(editor, {
		match: (n) => Element.isElementType(n, "code"),
	});

	return !!match;
};

export const isHeadingBlockActive = (
	editor: SlateEditor,
	level: Editor.HeadingElement["level"],
) => {
	const [match] = SlateEditor.nodes(editor, {
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

export const toggleBoldMark = (editor: SlateEditor) => {
	const isActive = isBoldMarkActive(editor);
	Transforms.setNodes(
		editor,
		{ bold: isActive ? null : true },
		{ match: (n) => Text.isText(n), split: true },
	);
};

export const toggleCodeBlock = (editor: SlateEditor) => {
	const isActive = isCodeBlockActive(editor);
	Transforms.setNodes<Editor.DefaultElement | Editor.CodeElement>(
		editor,
		{ type: isActive ? "paragraph" : "code" },
		{ match: (n) => SlateEditor.isBlock(editor, n) },
	);
};

export const toggleHeadingBlock = (
	editor: SlateEditor,
	level: Editor.HeadingElement["level"],
) => {
	const isActive = isHeadingBlockActive(editor, level);
	Transforms.setNodes<Editor.DefaultElement | Editor.HeadingElement>(
		editor,
		{ type: isActive ? "paragraph" : "heading", level },
		{ match: (n) => SlateEditor.isBlock(editor, n) },
	);
};
