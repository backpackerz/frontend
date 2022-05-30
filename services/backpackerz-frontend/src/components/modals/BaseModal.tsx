import * as React from "react";

import { styled, Modal, Types } from "@backpackerz/components";

export type Props = Types.Modal.DefaultProps & {
	heading?: string;
};

export default React.forwardRef<HTMLDivElement, Props>(function ModalDefault(
	props,
	ref,
) {
	const {
		className,
		heading,
		onOverlayClick,
		onClose,
		footerRender,
		children,
	} = props;
	return (
		<BaseModalBlock
			className={className}
			onOverlayClick={onOverlayClick}
			onClose={onClose}
			ref={ref}
			headerRender={
				<Header>
					<Heading>{heading}</Heading>
					<button className="modal__btn-close" onClick={onClose}>
						✕
					</button>
				</Header>
			}
			footerRender={footerRender}
		>
			{children}
		</BaseModalBlock>
	);
});

const BaseModalBlock = styled(Modal.Component)`
	.modal__container {
		.modal__header {
			margin-bottom: 2.2rem;
		}
	}
`;
const Header = styled("div")`
	display: flex;
	margin-bottom: 2rem;
	.modal__btn-close {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 20px;
		width: 20px;
		padding: 2px;
		font-size: 18px;
		font-weight: 600;
		color: black;
		border: none;
		border-radius: 2px;
		background-color: #fff;
		cursor: pointer;
		outline: none;
		&:hover,
		&:focus {
			box-shadow: 0 1px 1px 2px lightgray;
		}
		transition-duration: 0.2s;
	}
`;
const Heading = styled("h2")`
	line-height: 2.2rem;
	font-size: 1.8rem;
	font-weight: 600;
	flex: 1;
`;
