import { createContext, MutableRefObject } from "react";
import { Alert, AlertOptions } from "../../@types";

export type AlertContext = {
	alerts: Alert[];
	show: (message: string, options?: Partial<AlertOptions>) => void;
	success: (message: string, options?: Partial<AlertOptions>) => void;
	error: (message: string, options?: Partial<AlertOptions>) => void;
	info: (message: string, options?: Partial<AlertOptions>) => void;
	remove: (alert: Alert) => void;
	removeAll: () => void;
};

export default createContext<MutableRefObject<AlertContext | null | undefined>>(
	null!,
);
