import { useMutation } from "react-query";

import { Session } from "@backpackerz/core";

import { useDispatch, actions } from "modules";

type Props = {
	email: string;
	password: string;
};

const fetcher = ({ email, password }: Props) =>
	Session.service.login({ email, password });

export default function useLogin() {
	const dispatch = useDispatch();

	return useMutation({
		mutationFn: ({ email, password }: Props) =>
			fetcher({ email, password }),
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
