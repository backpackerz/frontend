import { POSITIONS, TYPES } from "../constants";
import DefaultContext from "../Context";

export type ValueOf<T> = T[keyof T];

export type DefaultContextType = typeof DefaultContext;

export type AlertOptions = {
	position?: typeof POSITIONS[keyof typeof POSITIONS];
	timeout?: number;
	type?: typeof TYPES[keyof typeof TYPES];
	onClose?: () => void;
	onOpen?: () => void;
};

export type Alert = {
	id: string;
	message: string;
	options: AlertOptions;
	close: () => void;
};
