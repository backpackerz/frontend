import * as React from "react";

import type { BackpackerzTypes } from "@backpackerz/core";
import { styled, Brand, Button, Modal } from "@backpackerz/components";
import useSignOut from "hooks/use-sign-out";
import useStoreSelector from "hooks/use-store-selector";
import * as MODAL_KEYS from "variables/constants/modals";

type Props = {
	user?: BackpackerzTypes.User;
};

export default function Navigation(props: Props) {
	const { user } = props;

	const [signout] = useSignOut();
	const { entity } = useStoreSelector((state) => state.app.user);
	const modal = Modal.useModal();

	const handleOpenModalExplorer = () => {
		modal.show({ type: MODAL_KEYS.MODAL_BROWSE });
	};
	const handleOpenModalItineraryCreate = () => {
		if (!entity) modal.show({ type: MODAL_KEYS.MODAL_LOGIN });
		else {
			modal.show({ type: MODAL_KEYS.MODAL_ITINERARY_CREATE });
		}
	};
	const handleOpenModalLogin = () => {
		modal.show({ type: MODAL_KEYS.MODAL_LOGIN });
	};
	const handleOpenModalLogout = () => {
		signout();
	};

	return (
		<NavigationBlock>
			<Brand />
			<Menu>
				<Item>
					<Button onClick={handleOpenModalExplorer}>탐색</Button>
				</Item>
				<Item>
					<Button onClick={handleOpenModalItineraryCreate}>
						일정 만들기
					</Button>
				</Item>
				<Item>
					{user ? (
						<Button onClick={handleOpenModalLogout}>
							로그아웃
						</Button>
					) : (
						<Button onClick={handleOpenModalLogin}>로그인</Button>
					)}
				</Item>
			</Menu>
		</NavigationBlock>
	);
}

const Item = styled("li")`
	& + & {
		margin-left: 0.4rem;
	}
`;

const Menu = styled("ul")`
	display: flex;
	list-style: none;
	margin: 0 0 0 auto;
`;

const NavigationBlock = styled("nav")`
	position: sticky;
	top: 0;
	display: flex;
	width: 100%;
	padding: 3.2rem 2.8rem;
	font-size: 2rem;
`;
