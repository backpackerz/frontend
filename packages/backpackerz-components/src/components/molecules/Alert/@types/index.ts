import {
	POSITIONS,
	TYPES,
} from "@backpackerz/components/variables/constants/alert";
import DefaultContext from "../hooks/use-alert/Context";

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
