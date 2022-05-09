import * as React from "react";
import styled from "@emotion/styled";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";

import Toolbar from "./components/Toolbar";
import Render from "./renders";
import * as actions from "./actions";
import { serialize } from "./serialize";
import { deserialize } from "./deserialize";
export { parseText } from "./deserialize";
import { palette } from "@backpackerz/components/styles/theme";

type Props = {
	className?: string;
	placeholder?: string;
	value: string;
	onChange?: (value: string) => unknown;
	serializer?: (value: Descendant[]) => string;
	deserializer?: (string: string) => Descendant[];
	readOnly?: boolean;
	children?: never;
};

export function BPEditor(props: Props) {
	const {
		className,
		placeholder,
		value,
		onChange,
		serializer = serialize,
		deserializer = deserialize,
		readOnly = false,
	} = props;
	const defaultValue: Descendant[] = value
		? deserializer(value)
		: [
				{
					type: "paragraph",
					children: [{ text: "" }],
				},
		  ];
	const editor = React.useMemo(() => withReact(createEditor()), []);
	const [tempValue, setTempValue] =
		React.useState<Descendant[]>(defaultValue);
	const renderLeaf = React.useCallback(Render.Leaf, []);
	const renderElement = React.useCallback(Render.Element, []);
	const handleKeyDown = React.useCallback((event: any) => {
		if (!event.ctrlKey) {
			return;
		}
		switch (event.key) {
			case "`": {
				event.preventDefault();
				actions.toggleCodeBlock(editor);
				break;
			}
			case "b": {
				event.preventDefault();
				actions.toggleBoldMark(editor);
				break;
			}
		}
	}, []);
	const handleOnChange = React.useCallback(
		(value: Descendant[]) => {
			// const isAstChange = editor.operations.some(
			// 	(op) => "set_selection" !== op.type,
			// );
			setTempValue(value);
			onChange && onChange(serializer(value));
		},
		[onChange],
	);
	return (
		<Slate editor={editor} value={tempValue} onChange={handleOnChange}>
			<EditorBlock className={className}>
				{readOnly || (
					<Toolbar
						className="toolbar"
						editor={editor}
						actions={actions}
					/>
				)}
				<EditableBlock
					className="textbox"
					readOnly={readOnly}
					placeholder={placeholder}
					renderElement={renderElement}
					renderLeaf={renderLeaf}
					onKeyDown={handleKeyDown}
					spellCheck={false}
					autoCorrect="false"
					autoCapitalize="false"
				/>
			</EditorBlock>
		</Slate>
	);
}
const EditorBlock = styled.div`
	.textbox {
		margin-top: 1rem;
		padding: 0.8rem 0.6rem;
		border: 1px solid #dee2e6;
		border-radius: 0.4rem;
		border: 1px solid ${palette.grey6};
	}
`;
const EditableBlock = styled(Editable)`
	height: 280px;
	overflow-x: hidden;
	overflow-y: visible;
`;
