import {
	createSlice,
	PayloadAction,
	SliceCaseReducers,
} from "@reduxjs/toolkit";

import type { BackpackerzTypes } from "@backpackerz/core";

export type InitialState = { data: BackpackerzTypes.User | undefined };

export const initialState: InitialState = { data: undefined };

const slice = createSlice<InitialState, SliceCaseReducers<InitialState>>({
	name: "user",
	initialState,
	reducers: {
		set(
			state,
			{ payload }: PayloadAction<BackpackerzTypes.User | undefined>,
		) {
			state.data = payload;
		},
	},
	extraReducers: (builder) => {},
});

export const reducer = slice.reducer;

export const state = slice.getInitialState();

export const actions = slice.actions;
