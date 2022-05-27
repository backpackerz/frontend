import * as redux from "react-redux";
import {
	Action,
	AnyAction,
	configureStore,
	combineReducers,
} from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { Context, createWrapper, HYDRATE } from "next-redux-wrapper";

import {
	reducer as UserReducer,
	actions as UserActions,
	initialState as UserInitialState,
} from "./app/user";

import { Backpackerz } from "types";
import type { BackpackerzTypes } from "@backpackerz/core";

type InitialState = {
	app: {
		user: Backpackerz.Store.AsyncState<BackpackerzTypes.User>;
	};
};
export type Store = ReturnType<(context: Context) => typeof store>;
export type AppDispatch = Store["dispatch"];
export type RootState = ReturnType<Store["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;

const initialState: InitialState = {
	app: {
		user: UserInitialState,
	},
};
const reducer = (state: InitialState = initialState, action: AnyAction) => {
	switch (action.type) {
		case HYDRATE: {
			return { ...state, ...action.payload };
		}
		default: {
			return combineReducers({
				app: combineReducers({
					user: UserReducer,
				}),
			})(state, action);
		}
	}
};

const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const wrapper = createWrapper(() => store, {
	debug: true,
	serializeState: (state) => JSON.stringify(state),
	deserializeState: (state) => JSON.parse(state),
});

export const useDispatch = () => redux.useDispatch<typeof store.dispatch>();

export const actions = {
	...UserActions,
};
