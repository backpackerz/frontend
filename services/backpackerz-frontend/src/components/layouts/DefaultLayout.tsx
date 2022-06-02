import * as React from "react";

import { styled } from "@backpackerz/components";
import useStoreSelector from "hooks/use-store-selector";
import Navigation from "components/layouts/Navigation";
import Footer from "components/layouts/Footer";

type Props = {
	children?: React.ReactNode;
};

export default function DefaultLayout(props: Props) {
	const { children } = props;
	const user = useStoreSelector((state) => state.app.user.data);
	return (
		<LayoutContainer>
			<Navigation user={user} />
			<Main>{children}</Main>
			<Footer />
		</LayoutContainer>
	);
}

const Main = styled("main")`
	flex: 1;
`;

const LayoutContainer = styled("div")`
	display: flex;
	flex-direction: column;
	height: max-content;
`;