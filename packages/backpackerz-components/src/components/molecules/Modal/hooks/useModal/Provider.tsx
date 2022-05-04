import * as React from "react";
import { createPortal } from "react-dom";
import disableScroll from "disable-scroll";

import {
	AppendModalProps,
	ModalContext,
	ModalOptions,
	ModalType,
	ProviderProps,
} from "../../@types";
import DefaultContext from "./Context";
import useOverlay from "../useOverlay";
import Modal from "../../components/Modal";

const AppendModal: React.FC<AppendModalProps> = ({
	children,
	currentModal,
	onOverlayClick,
	close,
	root,
	payloads,
	...rest
}) => {
	const ref = React.useRef<HTMLDivElement>(null);
	const ModalComponent = currentModal.component || Modal;
	useOverlay(true, close, ref);

	if (typeof window === "undefined") return null;
	return createPortal(
		<ModalComponent
			onOverlayClick={onOverlayClick}
			onClose={close}
			ref={ref}
			{...payloads}
			{...rest}
		/>,
		root.current,
	);
};

function Provider({
	children,
	Context = DefaultContext,
	modals = [],
}: React.PropsWithChildren<ProviderProps>) {
	const root = React.useRef<HTMLDivElement>();
	const modalContext = React.useRef<ModalContext>();
	const [currentModal, setcurrentModal] = React.useState<null | ModalType>(
		null,
	);
	const [currentModalPayloads, setCurrentModalPayloads] = React.useState<{
		[key in string]: any;
	}>({});

	React.useEffect(() => {
		root.current = document.createElement("div");
		root.current.id = "__react-modal__";
		document.body.appendChild(root.current);

		return () => {
			if (root.current) document.body.removeChild(root.current);
		};
	}, []);

	const show = React.useCallback(
		(
			{ type, options } = {
				type: "",
				options: {},
			},
			payloads: any,
		) => {
			let modal = modals.find((modal) => modal.type == type);
			if (!modal) return;
			modal = {
				...modal,
				options: {
					...modal?.options,
					...options,
				} as ModalOptions,
			} as ModalType;

			if (modal.options.preventScroll) {
				disableScroll.on();
			}
			setCurrentModalPayloads(payloads);
			setcurrentModal(modal);

			return modal;
		},
		[],
	);

	const close = React.useCallback(() => {
		if (!currentModal) return;
		if (currentModal.options.preventScroll) {
			disableScroll.off();
		}
		if (currentModal.options.preventScroll) {
			disableScroll.off();
		}
		setCurrentModalPayloads({});
		setcurrentModal(null);
	}, [setcurrentModal, currentModal]);

	const onOverlayClick = React.useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			event.stopPropagation();
			if (!currentModal) return;
			if (currentModal.options.closeOnOverlayClick) {
				close();
			}
		},
		[close, currentModal],
	);
	modalContext.current = {
		modals,
		show,
	} as ModalContext;

	const ModalComponent = currentModal?.component;
	return (
		<Context.Provider value={modalContext}>
			{children}
			{root.current && currentModal && ModalComponent && (
				<AppendModal
					currentModal={currentModal}
					onOverlayClick={onOverlayClick}
					close={close}
					root={root}
					payloads={currentModalPayloads}
				/>
			)}
		</Context.Provider>
	);
}

export default Provider;
