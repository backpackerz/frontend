import { useContext, useMemo } from "react";

import DefaultContext from "./Context";
import type { Modal } from "@backpackerz/components/types";

function useModal(context?: typeof DefaultContext): Modal.Context {
	const modalContext = useContext(context || DefaultContext);

	const modal = useMemo(() => {
		return modalContext!.current;
	}, [modalContext]);

	if (!modal) {
		throw Error("Context has not been Provided!");
	}
	return modal;
}

export default useModal;
