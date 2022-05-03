import {
	BaseEditor,
	ElementInterface as BaseElementInterface,
	Element,
} from "slate";
import { ReactEditor } from "slate-react";

export type CustomEditor = BaseEditor & ReactEditor;

export type DefaultElement = {
	type: "paragraph";
	children: CustomText[];
};
export type HeadingElement = {
	type: "heading";
	level: 1 | 2 | 3 | 4 | 5 | 6;
	children: CustomText[];
};
export type CodeElement = {
	type: "code";
	children: CustomText[];
};

export type CustomElement = DefaultElement | HeadingElement | CodeElement;

export type FormattedText = { text: string; bold?: true | null };

export type CustomText = FormattedText;

declare module "slate" {
	interface CustomTypes {
		Editor: CustomEditor;
		Element: CustomElement;
		Text: CustomText;
	}
}
