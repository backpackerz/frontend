import * as MODAL_KEYS from "variables/constants/modals";
import BrowseModal from "./BrowseModal";
import SignModal from "./SignModal";
import ItineraryCreateModal from "./ItineraryCreateModal";
import CreateStoryModal from "./StoryCreateModal";

export const modalConfig = [
	{
		type: MODAL_KEYS.MODAL_BROWSE,
		options: {
			preventScroll: true,
			closeOnOverlayClick: true,
		},
		component: BrowseModal,
	},
	{
		type: MODAL_KEYS.MODAL_LOGIN,
		options: {
			preventScroll: true,
			closeOnOverlayClick: true,
		},
		component: SignModal,
	},
	{
		type: MODAL_KEYS.MODAL_ITINERARY_CREATE,
		options: {
			preventScroll: true,
			closeOnOverlayClick: true,
		},
		component: ItineraryCreateModal,
	},
	{
		type: MODAL_KEYS.MODAL_STORY_CREATE,
		options: {
			preventScroll: true,
			closeOnOverlayClick: true,
		},
		component: CreateStoryModal,
	},
];
