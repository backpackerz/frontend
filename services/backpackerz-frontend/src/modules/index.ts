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
	default as AppReducer,
	stateType as AppStateType,
	initialState as AppInitialState,
} from "./app";

const reducer = (
	state: {
		app: AppStateType;
	} = {
		app: AppInitialState,
	},
	action: AnyAction,
) => {
	switch (action.type) {
		case HYDRATE: {
			return { ...state, ...action.payload };
		}
		default: {
			return combineReducers({
				app: AppReducer,
			})(state, action);
		}
	}
};

const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
export type Store = ReturnType<(context: Context) => typeof store>;
export type AppDispatch = Store["dispatch"];
export type RootState = ReturnType<Store["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
export const wrapper = createWrapper(() => store, {
	debug: true,
	serializeState: (state) => JSON.stringify(state),
	deserializeState: (state) => JSON.parse(state),
});
export const useDispatch = () => redux.useDispatch<typeof store.dispatch>();
