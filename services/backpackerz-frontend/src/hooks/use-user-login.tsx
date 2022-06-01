import { useMutation } from "react-query";

import { Session, BackpackerzTypes } from "@backpackerz/core";

import { useDispatch, actions } from "modules";

const fetcher = ({ email, password }: BackpackerzTypes.UserLoginProps) =>
	Session.service.login({ email, password });

export default function useLogin() {
	const dispatch = useDispatch();

	return useMutation({
		mutationFn: fetcher,
		useErrorBoundary: (error: any) => error.response?.status >= 500,
		onMutate: async (variables) => {
			return {};
		},
		onSuccess: (result, variables, context) => {
			dispatch(actions.set(result));
		},
		onError: (error, variables, context) => {
			dispatch(actions.set(undefined));
		},
	});
}
