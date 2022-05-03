import { User } from "@backpackerz/core";

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

const validate = (actionProps: ActionProps) => {
	const { email, password, passwordCheck, nickname } = actionProps;
	if (!email) throw Error("이메일을 입력해주세요.");
	else if (!password) throw Error("비밀번호를 입력해주세요.");
	else if (!passwordCheck) throw Error("비밀번호 확인란을 입력해주세요.");
	else if (password !== passwordCheck) {
		throw Error("비밀번호 확인란이 일치하지 않습니다.");
	} else if (!nickname) throw Error("닉네임을 입력해주세요.");
};

export default function useSignUp(props?: Props) {
	const execute = async (actionProps: ActionProps) => {
		const { email, password, nickname } = actionProps;
		const { onFailed, onSucceeded } = props || {};
		try {
			validate(actionProps);
			await User.service.createUser({
				email,
				password,
				nickname,
			});
			onSucceeded && onSucceeded();
		} catch (error) {
			if (error instanceof Error) {
				onFailed && onFailed(error);
			}
		}
	};

	return [execute];
}
