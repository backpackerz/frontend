import * as React from "react";
import { createPortal } from "react-dom";
import disableScroll from "disable-scroll";
import useOverlay from "../useOverlay";
import Modal from "../../components/Modal";
import { ModalOptions, AppendModalProps } from "./@types";

const AppendModal: React.FC<AppendModalProps> = ({
	children,
	isOpen = false,
	onOverlayClick,
	elementId = "modal-root",
	close,
	component = Modal,
	...rest
}) => {
	const ref = React.useRef<HTMLDivElement>(null);
	const ModalComponent = component || Modal;
	useOverlay(isOpen, close, ref);

	if (isOpen === false) {
		return null;
	}
	if (typeof window === "undefined") return null;
	return createPortal(
		<ModalComponent
			onOverlayClick={onOverlayClick}
			onClose={close}
			ref={ref}
			{...rest}
		>
			{children}
		</ModalComponent>,
		document.getElementById(elementId) as HTMLElement,
	);
};
function useAppendModal<P>(
	elementId = "modal-root",
	options: ModalOptions = {},
): [
	ModalWrapper: React.FC<P & { children?: React.ReactNode }>,
	open: () => void,
	close: () => void,
	isOpen: boolean,
] {
	const {
		preventScroll = false,
		closeOnOverlayClick = true,
		beforeClose = () => null,
		component = Modal,
	} = options;
	const [isOpen, setOpen] = React.useState<boolean>(false);
	const open = React.useCallback(() => {
		setOpen(true);
		if (preventScroll) {
			disableScroll.on();
		}
	}, [setOpen, preventScroll]);

	const close = React.useCallback(() => {
		beforeClose();
		setOpen(false);
		if (preventScroll) {
			disableScroll.off();
		}
	}, [setOpen, preventScroll]);
	const onOverlayClick = React.useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			event.stopPropagation();
			if (closeOnOverlayClick) {
				close();
			}
		},
		[closeOnOverlayClick, close],
	);

	const ModalWrapper = React.useCallback(
		({ children, ...rest }: React.PropsWithChildren<any>) => {
			return (
				<AppendModal
					isOpen={isOpen}
					onOverlayClick={onOverlayClick}
					elementId={elementId}
					close={close}
					component={component}
					{...rest}
				>
					{children}
				</AppendModal>
			);
		},
		[isOpen, close, elementId],
	);

	return [ModalWrapper, open, close, isOpen];
}

export default useAppendModal;
