import { combineReducers } from "redux";

import type { BackpackerzTypes } from "@backpackerz/core";
import { Backpackerz } from "types";

import {
	reducer as UserReducer,
	actions as UserActions,
	initialState as UserInitialState,
} from "./user";

export type stateType = {
	user: Backpackerz.Store.State<BackpackerzTypes.User>;
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
