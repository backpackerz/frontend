import * as React from "react";

import type { Alert } from "@backpackerz/components/types";

export type AlertContext = {
	alerts: Alert.AlertType[];
	show: (message: string, options?: Partial<Alert.Options>) => void;
	success: (message: string, options?: Partial<Alert.Options>) => void;
	error: (message: string, options?: Partial<Alert.Options>) => void;
	info: (message: string, options?: Partial<Alert.Options>) => void;
	remove: (alert: Alert.AlertType) => void;
	removeAll: () => void;
};

export default React.createContext<
	React.MutableRefObject<AlertContext | null | undefined>
>(null!);
