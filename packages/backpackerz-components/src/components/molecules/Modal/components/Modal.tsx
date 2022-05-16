import * as React from "react";
import { styled } from "@mui/material";

import type { Modal } from "@backpackerz/components/types";

const BaseModal: Modal.ComponentType = (
	{ className, onOverlayClick, headerRender, footerRender, children },
	ref: React.ForwardedRef<HTMLDivElement>,
) => {
	return (
		<ModalBlock className={className} role="dialog" aria-modal>
			<Overlay className="modal__overlay" onClick={onOverlayClick} />
			<Container className="modal__container" ref={ref}>
				{headerRender && (
					<Header className="modal__header">{headerRender}</Header>
				)}
				<Body className="modal__body">{children}</Body>
				{footerRender && (
					<Footer className="modal__footer">{footerRender}</Footer>
				)}
			</Container>
		</ModalBlock>
	);
};
const ModalBlock = styled("div")`
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
`;

const Overlay = styled("div")`
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 100000;
`;

const Container = styled("div")`
	position: relative;
	display: flex;
	flex-direction: column;
	width: calc(100% - 4.8rem);
	max-height: 100vh;
	margin: auto;
	padding: 4.2rem 3.6rem;
	background: #fff;
	border-radius: 0.4rem;
	box-shadow: 0 2px 12px 0 rgb(35 57 66 / 42%);
	z-index: 100001;
	transition-duration: 0.3s;
`;

const Header = styled("div")``;

const Body = styled("div")`
	flex: 1;
`;

const Footer = styled("div")``;

export default React.forwardRef<HTMLDivElement, Modal.DefaultProps>(BaseModal);
