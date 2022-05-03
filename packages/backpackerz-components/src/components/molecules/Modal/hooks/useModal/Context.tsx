import { createContext, MutableRefObject } from "react";
import { ModalContext } from "./@types";

const DefaultContext = createContext<null | MutableRefObject<
	ModalContext | null | undefined
>>(null);

export default DefaultContext;
