import { VALIDATIONS, User } from "@backpackerz/core";

type Props = {
	onIdle?: () => unknown;
	onPending?: () => unknown;
	onSucceeded?: () => unknown;
	onFailed?: (error: Error) => unknown;
};
type ActionProps = {
	email: string;
	password: string;
	passwordCheck: string;
	nickname: string;
};

export default function useSignUp(props: Props) {
	const execute = async (actionProps: ActionProps) => {
		const { onFailed, onSucceeded } = props || {};
		try {
			const { email, password, nickname } =
				await VALIDATIONS.signUpSchema.validate(actionProps, {
					abortEarly: false,
				});
			await User.service.createUser({
				email,
				password,
				nickname,
			});
			onSucceeded && onSucceeded();
		} catch (error: any) {
			if (error.errors && error.errors.length) {
				error.message = error.errors[0];
			}
			if (error instanceof Error) {
				onFailed && onFailed(error);
			}
		}
	};

	return [execute];
}
