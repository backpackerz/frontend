import * as React from "react";
import styled from "@emotion/styled";
import { Editor } from "slate";

import * as Actions from "../../actions";
import Button from "../../components/Button";

export type Props = {
	className?: string;
	editor: Editor;
	actions: typeof Actions;
};

function Toolbar({ className, editor, actions }: Props) {
	return (
		<ToolbarBlock className={className}>
			<Button
				onMouseDown={(event) => {
					event.preventDefault();
					actions.toggleHeadingBlock(editor, 1);
				}}
			>
				H1
			</Button>
			<Button
				onMouseDown={(event) => {
					event.preventDefault();
					actions.toggleHeadingBlock(editor, 2);
				}}
			>
				H2
			</Button>
			<Button
				onMouseDown={(event) => {
					event.preventDefault();
					actions.toggleCodeBlock(editor);
				}}
			>
				Code
			</Button>
			<Button
				onMouseDown={(event) => {
					event.preventDefault();
					actions.toggleBoldMark(editor);
				}}
			>
				Bold
			</Button>
		</ToolbarBlock>
	);
}
const ToolbarBlock = styled.div`
	button {
		& + button {
			margin-left: 0.2rem;
		}
	}
`;

export { Toolbar };
