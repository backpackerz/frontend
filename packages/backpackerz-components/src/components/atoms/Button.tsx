import * as React from "react";
import { styled } from "@mui/material";
import ButtonUnstyled, {
	buttonUnstyledClasses,
	ButtonUnstyledProps,
} from "@mui/base/ButtonUnstyled";

export type Props = React.ComponentPropsWithoutRef<"button"> &
	ButtonUnstyledProps & {};

const CustomButton = styled(ButtonUnstyled)(
	({ theme }) => `
		&.${buttonUnstyledClasses.root} {
			padding: 8px 14px;
			border-radius: 0.4rem;
			background-color: ${theme.palette.grey[700]};
			color: ${theme.palette.grey[50]};
			font-family: IBM Plex Sans, sans-serif;
			font-weight: bold;
			font-size: 1.275rem;
			transition: all 150ms ease;
			cursor: pointer;
			border: none;
		
			&.${buttonUnstyledClasses.active} {
				background-color: ${theme.palette.grey[700]};
			}
		
			&.${buttonUnstyledClasses.focusVisible} {
				outline: 3px solid ${theme.palette.grey[400]};
				border-color: ${theme.palette.grey[700]};
			}
			
			&:hover {
				background-color: ${theme.palette.grey[800]};
			}

			&.${buttonUnstyledClasses.disabled} {
				opacity: 0.5;
				cursor: not-allowed;
			}
		}`,
);

export default function Button(props: Props) {
	const { children, ...htmlProps } = props;
	return <CustomButton {...htmlProps}>{children}</CustomButton>;
}
