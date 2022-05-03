import * as React from "react";

import { Modal } from "@backpackerz/components";
import BaseModal, { Props } from "./base/Modal.default";
import ModalSign from "./Modal.sign";
import ModalBrowse from "./Modal.browse";
import ModalItineraryCreate from "./Modal.itinerary.create";
import ModalStoryCreate, {
	Props as StoryModalProps,
} from "./Modal.story.create";

type ModalRefType<T> = React.ForwardRefExoticComponent<
	T & Modal.ModalProps & React.RefAttributes<HTMLDivElement>
>;
interface ModalCompound {
	Sign?: ModalRefType<Modal.ModalComponentType>;
	Browse?: ModalRefType<Modal.ModalComponentType>;
	ItineraryCreate?: ModalRefType<Modal.ModalComponentType>;
	StoryCreate?: ModalRefType<Modal.ModalComponentType & StoryModalProps>;
}

const ModalComponents = BaseModal;

(ModalComponents as ModalRefType<Props> & ModalCompound).Sign =
	ModalSign as ModalRefType<Modal.ModalComponentType>;

(ModalComponents as ModalRefType<Props> & ModalCompound).Browse =
	ModalBrowse as ModalRefType<Modal.ModalComponentType>;

(ModalComponents as ModalRefType<Props> & ModalCompound).ItineraryCreate =
	ModalItineraryCreate as ModalRefType<Modal.ModalComponentType>;

(ModalComponents as ModalRefType<Props> & ModalCompound).StoryCreate =
	ModalStoryCreate as ModalRefType<
		Modal.ModalComponentType & StoryModalProps
	>;

export default ModalComponents as ModalRefType<Props> & ModalCompound;
