import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";

import type { BackpackerzTypes } from "@backpackerz/core";
import { Session } from "@backpackerz/core";
import { Backpackerz } from "types";

export const initialState: Backpackerz.Store.State<BackpackerzTypes.User> = {
	entity: undefined,
	type: undefined,
	loading: "idle",
	currentRequestId: undefined,
	error: undefined,
};

const AsyncActionLogin = createAsyncThunk<
	BackpackerzTypes.User,
	Pick<BackpackerzTypes.User, "email" | "password">,
	{
		rejectValue: AxiosResponse["data"];
	}
>("user/login", async (user, { getState, requestId, rejectWithValue }) => {
	try {
		const response = await Session.service.login(user);
		return response;
	} catch (error) {
		const response = (error as AxiosError).response;
		if (!response) throw error;
		return rejectWithValue(response.data);
	}
});

const AsyncActionLogout = createAsyncThunk<
	void,
	void,
	{
		rejectValue: AxiosResponse["data"];
	}
>("user/logout", async () => {
	await Session.service.logout();
});

const AsyncActionCurrentUser = createAsyncThunk<
	BackpackerzTypes.User,
	void,
	{
		rejectValue: AxiosResponse["data"];
	}
>("user/currentUser", async () => {
	const response = await Session.service.getCurrentUser();
	return response;
});

const slice = createSlice({
	name: "user",
	initialState,
	reducers: {
		idle(state) {
			state.loading = "idle";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(
				AsyncActionLogin.pending,
				(state, { meta: { requestId } }) => {
					if (state.loading === "idle") {
						state.type = AsyncActionLogin.typePrefix;
						state.loading = "pending";
						state.currentRequestId = requestId;
						state.error = undefined;
					}
				},
			)
			.addCase(
				AsyncActionLogin.fulfilled,
				(state, { meta: { requestId }, payload }) => {
					if (
						state.loading === "pending" &&
						state.currentRequestId === requestId
					) {
						state.loading = "succeeded";
						state.type = AsyncActionLogin.typePrefix;
						state.entity = payload;
						state.currentRequestId = undefined;
						state.error = undefined;
					}
				},
			)
			.addCase(
				AsyncActionLogin.rejected,
				(state, { meta: { requestId }, payload: error }) => {
					if (
						state.loading === "pending" &&
						state.currentRequestId === requestId
					) {
						state.loading = "failed";
						state.type = AsyncActionLogin.typePrefix;
						state.entity = undefined;
						state.currentRequestId = undefined;
						state.error = error;
					}
				},
			);

		builder
			.addCase(
				AsyncActionLogout.pending,
				(state, { meta: { requestId } }) => {
					if (state.loading === "idle") {
						state.loading = "pending";
						state.type = AsyncActionLogout.typePrefix;
						state.currentRequestId = requestId;
						state.error = undefined;
					}
				},
			)
			.addCase(
				AsyncActionLogout.fulfilled,
				(state, { meta: { requestId } }) => {
					if (
						state.loading === "pending" &&
						state.currentRequestId === requestId
					) {
						state.loading = "succeeded";
						state.type = AsyncActionLogout.typePrefix;
						state.entity = undefined;
						state.currentRequestId = undefined;
						state.error = undefined;
					}
				},
			)
			.addCase(
				AsyncActionLogout.rejected,
				(state, { meta: { requestId }, payload: error }) => {
					if (
						state.loading === "pending" &&
						state.currentRequestId === requestId
					) {
						state.loading = "failed";
						state.type = AsyncActionLogout.typePrefix;
						state.entity = undefined;
						state.currentRequestId = undefined;
						state.error = error;
					}
				},
			);
		builder
			.addCase(
				AsyncActionCurrentUser.pending,
				(state, { meta: { requestId } }) => {
					state.loading = "pending";
					state.type = AsyncActionCurrentUser.typePrefix;
					state.currentRequestId = requestId;
					state.error = undefined;
				},
			)
			.addCase(
				AsyncActionCurrentUser.fulfilled,
				(state, { meta: { requestId }, payload }) => {
					state.loading = "succeeded";
					state.type = AsyncActionCurrentUser.typePrefix;
					state.entity = payload;
					state.currentRequestId = undefined;
					state.error = undefined;
				},
			)
			.addCase(
				AsyncActionCurrentUser.rejected,
				(state, { meta: { requestId }, payload: error }) => {
					state.loading = "failed";
					state.type = AsyncActionCurrentUser.typePrefix;
					state.entity = undefined;
					state.currentRequestId = undefined;
					state.error = error;
				},
			);
	},
});
export const reducer = slice.reducer;

export const state = slice.getInitialState();

export const actions = {
	...slice.actions,
	AsyncActionLogin,
	AsyncActionLogout,
	AsyncActionCurrentUser,
};
