import * as React from "react";

import { Button, Input, Label, Alert } from "@backpackerz/components";
import useSignUp from "hooks/use-sign-up";
import * as MESSAGES from "variables/constants/messages";

type Props = {
	close: () => unknown;
	toggleForm: (event?: React.MouseEvent) => unknown;
};

export default function FormSignup(props: Props) {
	const { toggleForm } = props;

	const [email, setEmail] = React.useState<string>("");
	const [password, setPassword] = React.useState<string>("");
	const [passwordCheck, setPasswordCheck] = React.useState<string>("");
	const [nickname, setNickname] = React.useState<string>("");
	const alert = Alert.useAlert();
	const [signup] = useSignUp({
		onSucceeded: () => {
			alert.show(MESSAGES.SIGN_UP_SUCCEED);
			toggleForm();
		},
		onFailed: (error) => {
			alert.error(error.message);
		},
	});

	const handleSubmitSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
		await signup({
			email,
			password,
			passwordCheck,
			nickname,
		});
	};
	return (
		<form>
			<Label htmlFor="email">Email</Label>
			<Input
				id="email"
				type="text"
				placeholder="Email"
				value={email}
				onChange={setEmail}
			/>
			<Label htmlFor="password">Password</Label>
			<Input
				id="password"
				type="password"
				placeholder="Password"
				value={password}
				onChange={setPassword}
			/>
			<Label htmlFor="passwordCheck">password check</Label>
			<Input
				id="passwordCheck"
				type="password"
				placeholder="check Password"
				value={passwordCheck}
				onChange={setPasswordCheck}
			/>
			<Label htmlFor="nickname">Nickname</Label>
			<Input
				id="nickname"
				type="text"
				placeholder="Nickname"
				value={nickname}
				onChange={setNickname}
			/>
			<Button onClick={toggleForm}>백패커즈 계정이 있습니다. →</Button>
			<Button onClick={handleSubmitSignUp}>회원가입</Button>
		</form>
	);
}
