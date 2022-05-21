import { useContext, useMemo } from "react";

import DefaultContext from "./Context";
import type { Alert } from "@backpackerz/components/types";

export default function useAlert(
	context?: typeof DefaultContext,
): Alert.Context {
	const alertContext = useContext(context || DefaultContext);

	const alert = useMemo(() => {
		return alertContext?.current;
	}, [alertContext]);

	if (!alert) {
		throw Error("Context has not been Provided!");
	}
	return alert;
}
