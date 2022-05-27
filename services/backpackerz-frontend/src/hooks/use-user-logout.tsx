import { useMutation } from "react-query";

import { Session } from "@backpackerz/core";

import { useDispatch, actions } from "modules";

const fetcher = () => Session.service.logout();

export default function useLogout() {
	const dispatch = useDispatch();

	return useMutation({
		mutationFn: fetcher,
		useErrorBoundary: (error: any) => error.response?.status >= 500,
		onMutate: async (variables) => {
			return {};
		},
		onSuccess: (result, variables, context) => {
			dispatch(actions.set(undefined));
		},
		onError: (error, variables, context) => {
			dispatch(actions.set(undefined));
		},
	});
}
