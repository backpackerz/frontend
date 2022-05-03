import * as React from "react";

export type ModalOptions = {
	preventScroll?: boolean;
	closeOnOverlayClick?: boolean;
	beforeClose?: () => void;
	component?: ModalComponentExtendsType<ModalProps>;
};
export interface ModalProps extends React.HTMLProps<HTMLDivElement> {
	className?: string;
	onOverlayClick: React.MouseEventHandler<HTMLDivElement>;
	onClose: () => void;
	headerRender?: React.ReactNode;
	footerRender?: React.ReactNode;
}

export type ModalComponentType<P = {}> =
	| React.ForwardRefRenderFunction<HTMLDivElement, P & ModalProps>
	| React.ForwardRefExoticComponent<P & ModalProps & HTMLDivElement>;

export type ModalComponentExtendsType<T extends ModalProps> =
	React.ForwardRefExoticComponent<any & T>;

export type AppendModalProps = {
	children?: React.ReactNode;
	isOpen: boolean;
	onOverlayClick: React.MouseEventHandler<HTMLDivElement>;
	elementId: "__next" | string;
	close: () => void;
	component?: ModalComponentExtendsType<ModalProps>;
};
