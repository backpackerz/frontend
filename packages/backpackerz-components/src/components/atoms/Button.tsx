import * as React from "react";
import styled from "@emotion/styled";
import ButtonUnstyled, {
	buttonUnstyledClasses,
	ButtonUnstyledProps,
} from "@mui/base/ButtonUnstyled";

import { palette } from "@backpackerz/components/styles/palette";

export type Props = React.ComponentPropsWithoutRef<"button"> &
	ButtonUnstyledProps & {};

const CustomButton = styled(ButtonUnstyled)`
	&.${buttonUnstyledClasses.root} {
		font-family: IBM Plex Sans, sans-serif;
		font-weight: bold;
		font-size: 1.275rem;
		background-color: ${palette.gray7};
		padding: 8px 14px;
		border-radius: 0.4rem;
		color: ${palette.gray0};
		transition: all 150ms ease;
		cursor: pointer;
		border: none;

		&:hover {
			background-color: ${palette.gray8}};
		}
	
		&.${buttonUnstyledClasses.active} {
			background-color: ${palette.gray8};
		}
	
		&.${buttonUnstyledClasses.focusVisible} {
			outline: 3px solid ${palette.gray4};
			border-color: ${palette.gray8};
		}

		&.${buttonUnstyledClasses.disabled} {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}
`;

export default function Button(props: Props) {
	const { children, ...htmlProps } = props;
	return <CustomButton {...htmlProps}>{children}</CustomButton>;
}
