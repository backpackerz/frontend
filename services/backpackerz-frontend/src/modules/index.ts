import * as redux from "react-redux";
import { AnyAction, configureStore, combineReducers } from "@reduxjs/toolkit";
import { Context, createWrapper, HYDRATE } from "next-redux-wrapper";

import {
	reducer as UserReducer,
	actions as UserActions,
	initialState as UserInitialState,
	InitialState as UserInitialStateType,
} from "./app/user";

type InitialState = {
	app: {
		user: UserInitialStateType;
	};
};
export type Store = ReturnType<(context: Context) => typeof store>;
export type AppDispatch = Store["dispatch"];
export type RootState = ReturnType<Store["getState"]>;

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
