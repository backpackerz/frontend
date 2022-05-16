import {
	POSITIONS,
	TYPES,
} from "@backpackerz/components/variables/constants/alert";

export namespace Alert {
	export type Context = {
		alerts: AlertType[];
		show: (message: string, options?: Partial<Alert.Options>) => void;
		success: (message: string, options?: Partial<Alert.Options>) => void;
		error: (message: string, options?: Partial<Alert.Options>) => void;
		info: (message: string, options?: Partial<Alert.Options>) => void;
		remove: (alert: AlertType) => void;
		removeAll: () => void;
	};
	export type DefaultContextType = React.Context<
		React.MutableRefObject<Alert.Context | null | undefined>
	>;
	export type Options = {
		position?: typeof POSITIONS[keyof typeof POSITIONS];
		timeout?: number;
		type?: typeof TYPES[keyof typeof TYPES];
		onClose?: () => void;
		onOpen?: () => void;
	};
	export type AlertType = {
		id: string;
		message: string;
		options: Alert.Options;
		close: () => void;
	};
}
