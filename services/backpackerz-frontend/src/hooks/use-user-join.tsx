import { useMutation } from "react-query";

import { VALIDATIONS, User } from "@backpackerz/core";

type Props = {
	email: string;
	password: string;
	passwordCheck: string;
	nickname: string;
};
const fetcher = ({ email, password, nickname }: Props) =>
	User.service.createUser({
		email,
		password,
		nickname,
	});

const validate = (props: Props) =>
	VALIDATIONS.signUpSchema.validate(props, {
		abortEarly: false,
	});

export default function useJoin() {
	return useMutation({
		mutationFn: (props: Props) =>
			validate(props).then((props) => fetcher(props)),
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
