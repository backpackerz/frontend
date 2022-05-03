import { useContext, useMemo } from "react";
import DefaultContext from "./Context";
import { ModalContext } from "./@types";

function useModal(context?: typeof DefaultContext): ModalContext {
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
