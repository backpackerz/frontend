import { BackpackerzStore } from "modules/types";
import { Types } from "@backpackerz/core";
import { combineReducers } from "redux";
import {
	reducer as UserReducer,
	actions as UserActions,
	initialState as UserInitialState,
} from "./user";

export type stateType = {
	user: BackpackerzStore.State<Types.User>;
};

export const initialState = {
	user: UserInitialState,
};

export default combineReducers({
	user: UserReducer,
});

export const actions = {
	...UserActions,
};
