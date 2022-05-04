import * as Types from "./@types";
export { default as Component } from "./components/Modal";

export { default as Provider } from "./hooks/useModal/Provider";
export { default as useModal } from "./hooks/useModal";

export type ModalProps = Types.ModalDefaultProps;
export type ModalComponentType<P = {}> = Types.ModalComponentType<P>;
