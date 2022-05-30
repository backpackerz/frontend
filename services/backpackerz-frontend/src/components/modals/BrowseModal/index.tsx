import * as React from "react";

import { styled, Input, Types } from "@backpackerz/components";
import BaseModal from "../BaseModal";

export default React.forwardRef<HTMLDivElement, Types.Modal.DefaultProps>(
	function ModalBrowse(props, ref) {
		const { onOverlayClick, onClose } = props;

		return (
			<BrowseModalBlock
				heading="탐색"
				onOverlayClick={onOverlayClick}
				onClose={onClose}
				ref={ref}
			>
				<Input />
				<div className="modal-browse__result"></div>
			</BrowseModalBlock>
		);
	},
);

const BrowseModalBlock = styled(BaseModal)`
	.modal__container {
		height: 100%;
		width: 100%;
		margin: 0;
	}
`;
