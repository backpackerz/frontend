import * as React from "react";

import { styled, Types } from "@backpackerz/components";
import BaseModal from "../base/BaseModal";
import FormSignin from "./Form.signin";
import FormSignup from "./Form.signup";

type formType = typeof FORMS[keyof typeof FORMS];

const FORMS = {
	SIGN_IN: 0,
	SIGN_UP: 1,
} as const;

export default React.forwardRef<HTMLDivElement, Types.Modal.DefaultProps>(
	function ModalSign(props, ref) {
		const { onOverlayClick, onClose } = props;

		const [currentForm, setCurrentForm] = React.useState<formType>(
			FORMS.SIGN_IN,
		);

		const toggleForm = (event?: React.MouseEvent) => {
			event && event.preventDefault();
			if (currentForm == FORMS.SIGN_IN) setCurrentForm(FORMS.SIGN_UP);
			else setCurrentForm(FORMS.SIGN_IN);
		};

		return (
			<ModalBlock
				heading={currentForm == FORMS.SIGN_IN ? "로그인" : "회원가입"}
				onOverlayClick={onOverlayClick}
				onClose={onClose}
				ref={ref}
			>
				<WrapperSign>
					{currentForm == FORMS.SIGN_IN && (
						<FormSignin toggleForm={toggleForm} close={onClose} />
					)}
					{currentForm == FORMS.SIGN_UP && (
						<FormSignup toggleForm={toggleForm} close={onClose} />
					)}
				</WrapperSign>
			</ModalBlock>
		);
	},
);

const WrapperSign = styled("div")`
	form {
		display: flex;
		flex-direction: column;
		label {
			display: inline-block;
			margin: 0 0.833rem 1.333rem 0.833rem;
			font-size: 1.4rem;
			cursor: pointer;
		}
		input + label {
			margin-top: 2.833rem;
		}
		input {
			width: 100%;
		}
		button {
			margin-top: 2rem;
			& + button {
				float: right;
			}
		}
		&::after {
			display: table;
			content: "";
			clear: both;
		}
	}
`;

const ModalBlock = styled(BaseModal)`
	.modal__container {
		max-width: 40rem;
	}
`;
