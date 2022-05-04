import { useContext, useMemo } from "react";
import DefaultContext, { AlertContext } from "./Context";

export default function useAlert(
	context?: typeof DefaultContext,
): AlertContext {
	const alertContext = useContext(context || DefaultContext);

	const alert = useMemo(() => {
		return alertContext?.current;
	}, [alertContext]);

	if (!alert) {
		throw Error("Context has not been Provided!");
	}
	return alert;
}
