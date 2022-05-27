import * as React from "react";

import type { BackpackerzTypes } from "@backpackerz/core";

import { Backpackerz } from "types";
import { useDispatch, actions } from "modules";
import useStoreSelector from "hooks/use-store-selector";

type Props = {
	onIdle?: () => unknown;
	onPending?: () => unknown;
	onSucceeded?: () => unknown;
	onFailed?: (error: Backpackerz.Store.Error) => unknown;
};

export default function useSignIn(
	props?: Props,
): [
	(email: string, password: string) => void,
	Backpackerz.Store.State<BackpackerzTypes.User>,
] {
	const dispatch = useDispatch();
	const state = useStoreSelector((state) => state.app.user);

	React.useEffect(() => {
		if (state.type != actions.AsyncActionLogin.typePrefix) return;
		const { onIdle, onPending, onSucceeded, onFailed } = props || {};

		switch (state.loading) {
			case "idle":
				onIdle && onIdle();
				break;
			case "pending":
				onPending && onPending();
				break;
			case "succeeded":
				onSucceeded && onSucceeded();
				dispatch(actions.idle());
				break;
			case "failed":
				onFailed && onFailed(state.error!);
				dispatch(actions.idle());
				break;
		}
	}, [state.error, state.loading]);

	const execute = (email: string, password: string) =>
		dispatch(actions.AsyncActionLogin({ email, password }));

	return [execute, state];
}
