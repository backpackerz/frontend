import * as React from "react";
import styled from "@emotion/styled";
import { Editor } from "slate";

import * as Actions from "../actions";
import Button from "@backpackerz/components/components/atoms/Button";

export type Props = {
	className?: string;
	editor: Editor;
	actions: typeof Actions;
};

export default function Toolbar(props: Props) {
	const { className, editor, actions } = props;

	const handleToggleHeading1 = (event: React.MouseEvent) => {
		event.preventDefault();
		actions.toggleHeadingBlock(editor, 1);
	};
	const handleToggleHeading2 = (event: React.MouseEvent) => {
		event.preventDefault();
		actions.toggleHeadingBlock(editor, 2);
	};
	const handleToggleCode = (event: React.MouseEvent) => {
		event.preventDefault();
		actions.toggleCodeBlock(editor);
	};
	const handleToggleBold = (event: React.MouseEvent) => {
		event.preventDefault();
		actions.toggleBoldMark(editor);
	};
	return (
		<ToolbarBlock className={className}>
			<Button onMouseDown={handleToggleHeading1}>H1</Button>
			<Button onMouseDown={handleToggleHeading2}>H2</Button>
			<Button onMouseDown={handleToggleCode}>Code</Button>
			<Button onMouseDown={handleToggleBold}>Bold</Button>
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
