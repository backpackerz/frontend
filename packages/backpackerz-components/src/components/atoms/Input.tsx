import * as React from "react";
import styled from "@emotion/styled";
import InputUnstyled, {
	inputUnstyledClasses,
	InputUnstyledProps,
} from "@mui/base/InputUnstyled";
import ButtonUnstyled from "@mui/base/ButtonUnstyled";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { palette } from "@backpackerz/components/styles/palette";

const StyledInputRoot = styled.div(
	() => `
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: IBM Plex Sans, sans-serif;
		font-weight: 500;
		border: 1px solid ${palette.gray6};
		border-radius: 8px;
		background: ${palette.gray0};

		&.${inputUnstyledClasses.focused} {
			outline: 3px solid ${palette.gray3};
			border-color: ${palette.gray8};
		}

		&:hover {
			background: ${palette.gray0};
			border-color: ${palette.gray8};
		}
`,
);

const StyledInputElement = styled.input(
	() => `
		flex-grow: 1;
		padding: 12px 12px;
		line-height: 1.5;
		font-size: 1.275rem;
		font-family: inherit;
		font-weight: 400;
		color: ${palette.gray9};
		background: inherit;
		border: none;
		border-radius: inherit;
		outline: 0;
		&:-webkit-autofill,
		&:-webkit-autofill:focus {
			box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0), inset 0 0 0 100px ${palette.gray0};
		}
		&:-webkit-autofill:hover {
			box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0), inset 0 0 0 100px ${palette.gray0};
		}
	`,
);

const IconButton = styled(ButtonUnstyled)`
	display: inline-flex;
	justify-content: center;
	align-items: center;
	border: none;
	background: inherit;
	cursor: pointer;
`;

const InputAdornment = styled.div`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	margin: 8px;
`;

export type Props = Omit<
	React.ComponentPropsWithoutRef<"input"> & InputUnstyledProps,
	"onChange"
> & {
	onChange?: (value: string) => unknown;
};

type State = {
	showPassword: boolean;
};

export default React.forwardRef(function CustomInput(
	props: Props,
	ref: React.ForwardedRef<HTMLDivElement>,
) {
	const {
		components,
		type,
		onChange,
		startAdornment,
		endAdornment,
		...htmlProps
	} = props;

	const [state, setState] = React.useState<State>({
		showPassword: false,
	});

	const isVisiblePassword = React.useMemo(
		() => type === "password" && state.showPassword,
		[type, state],
	);

	const handleChangedValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange && onChange(event.target.value);
	};
	const handleClickShowPassword = () => {
		setState({
			...state,
			showPassword: !state.showPassword,
		});
	};
	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		event.preventDefault();
	};

	const ToggleShowPasswordButton = (
		<IconButton
			aria-label="toggle password visibility"
			onClick={handleClickShowPassword}
			onMouseDown={handleMouseDownPassword}
			edge="end"
			style={{ margin: "auto" }}
		>
			{state.showPassword ? <VisibilityOff /> : <Visibility />}
		</IconButton>
	);
	const StartAdornment = React.useMemo(() => {
		return <InputAdornment>{startAdornment}</InputAdornment>;
	}, [startAdornment]);
	const EndAdornment = React.useMemo(() => {
		return (
			<InputAdornment>
				{endAdornment
					? endAdornment
					: type === "password" && ToggleShowPasswordButton}
			</InputAdornment>
		);
	}, [type, endAdornment, state]);

	return (
		<InputUnstyled
			type={isVisiblePassword ? "text" : type}
			components={{
				Root: StyledInputRoot,
				Input: StyledInputElement,
				...components,
			}}
			startAdornment={StartAdornment}
			endAdornment={EndAdornment}
			onChange={handleChangedValue}
			{...htmlProps}
			ref={ref}
		/>
	);
});
