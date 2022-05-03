import DefaultContext from "../Context";

export type ModalOptions = {
	preventScroll?: boolean;
	closeOnOverlayClick?: boolean;
	beforeClose?: () => void;
};

export interface ModalDefaultProps extends React.HTMLProps<HTMLDivElement> {
	className?: string;
	onOverlayClick: React.MouseEventHandler<HTMLDivElement>;
	onClose: () => unknown;
	headerRender?: React.ReactNode;
	footerRender?: React.ReactNode;
}
export type ModalComponentType<P = {}> =
	| React.ForwardRefRenderFunction<HTMLDivElement, P & ModalDefaultProps>
	| React.ForwardRefExoticComponent<P & ModalDefaultProps & HTMLDivElement>;

export type ModalType = {
	type: string;
	options: ModalOptions;
	component?: ModalComponentType<any>;
};

export type ModalContext = {
	modals: ModalType[];
	show: (
		{
			type,
			options,
		}: {
			type: string;
			options?: Partial<ModalOptions>;
		},
		payloads?: { [key in string]: any },
	) => unknown;
};
export type AppendModalProps = {
	children?: React.ReactNode;
	currentModal: ModalType;
	onOverlayClick: React.MouseEventHandler<HTMLDivElement>;
	close: () => unknown;
	root: any;
	payloads?: { [key in string]: any };
};

export type ProviderProps = {
	Context?: typeof DefaultContext;
	modals: ModalType[];
};
