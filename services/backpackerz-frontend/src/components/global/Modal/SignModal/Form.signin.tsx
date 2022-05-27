import * as React from "react";

import { Button, Input, Label, Alert } from "@backpackerz/components";

import useLogin from "hooks/use-user-login";
import * as MESSAGES from "variables/constants/messages";

type Props = {
	close: () => unknown;
	toggleForm: (event?: React.MouseEvent) => unknown;
};

export default function FormSignin(props: Props) {
	const { close, toggleForm } = props;

	const [email, setEmail] = React.useState<string>("");
	const [password, setPassword] = React.useState<string>("");
	const alert = Alert.useAlert();
	const login = useLogin();

	const handleSubmitSignIn = async (e: React.FormEvent) => {
		e.preventDefault();
		login.mutate(
			{
				email,
				password,
			},
			{
				onSuccess: () => {
					alert.show(MESSAGES.SIGN_IN_SUCCEED);
					close();
				},
				onError: (error) => {
					error && alert.show(error.message);
				},
			},
		);
	};

	return (
		<form>
			<Label htmlFor="email">Email</Label>
			<Input
				id="email"
				type="email"
				autoComplete="email"
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
			<Button onClick={toggleForm}>백패커즈 계정이 없으신가요? →</Button>
			<Button onClick={handleSubmitSignIn}>로그인</Button>
		</form>
	);
}
