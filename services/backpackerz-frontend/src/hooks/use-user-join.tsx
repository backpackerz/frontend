import { useMutation } from "react-query";

import { User, BackpackerzTypes } from "@backpackerz/core";

const fetcher = (props: BackpackerzTypes.UserJoinProps) =>
	User.service.createUser(props);

export default function useJoin() {
	return useMutation({
		mutationFn: fetcher,
		useErrorBoundary: (error: any) => error.response?.status >= 500,
		onMutate: async (variables) => {
			return {};
		},
		onSuccess: (result, variables, context) => {},
		onError: (error, variables, context) => {
			if (error.errors && error.errors.length) {
				error.message = error.errors[0];
			}
		},
	});
}
