import {
	POSITIONS,
	TYPES,
} from "@backpackerz/components/variables/constants/alert";

import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";

export namespace Alert {
	export type Context = {
		alerts: AlertType[];
		show: (message: string, options?: Partial<Alert.Options>) => void;
		success: (message: string, options?: Partial<Alert.Options>) => void;
		error: (message: string, options?: Partial<Alert.Options>) => void;
		info: (message: string, options?: Partial<Alert.Options>) => void;
		remove: (alert: AlertType) => void;
		removeAll: () => void;
	};
	export type DefaultContextType = React.Context<
		React.MutableRefObject<Alert.Context | null | undefined>
	>;
	export type Options = {
		position?: typeof POSITIONS[keyof typeof POSITIONS];
		timeout?: number;
		type?: typeof TYPES[keyof typeof TYPES];
		onClose?: () => void;
		onOpen?: () => void;
	};
	export type AlertType = {
		id: string;
		message: string;
		options: Alert.Options;
		close: () => void;
	};
}

export namespace Editor {
	export type EditorType = BaseEditor & ReactEditor;

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
}

declare module "slate" {
	interface CustomTypes {
		Editor: Editor.EditorType;
		Element: Editor.CustomElement;
		Text: Editor.CustomText;
	}
}
