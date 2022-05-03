import * as React from "react";
import { ThemeProvider } from "@emotion/react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { Alert, Modal } from "@backpackerz/components";
import ModalComponents from "components/organisms/Modal";
import { theme } from "styles/theme";
import * as MODAL_KEYS from "variables/constants/modals";

const { Template, Provider: AlertProvider, TRANSITIONS, POSITIONS } = Alert;

const alertOptions = {
	position: POSITIONS.TOP_CENTER,
	timeout: 1600,
	offset: "30px",
	transition: TRANSITIONS.SCALE,
	containerStyle: {
		zIndex: 99999,
	},
};

const Modals = [
	{
		type: MODAL_KEYS.MODAL_BROWSE,
		options: {
			preventScroll: true,
			closeOnOverlayClick: true,
		},
		component: ModalComponents.Browse,
	},
	{
		type: MODAL_KEYS.MODAL_LOGIN,
		options: {
			preventScroll: true,
			closeOnOverlayClick: true,
		},
		component: ModalComponents.Sign,
	},
	{
		type: MODAL_KEYS.MODAL_ITINERARY_CREATE,
		options: {
			preventScroll: true,
			closeOnOverlayClick: true,
		},
		component: ModalComponents.ItineraryCreate,
	},
	{
		type: MODAL_KEYS.MODAL_STORY_CREATE,
		options: {
			preventScroll: true,
			closeOnOverlayClick: true,
		},
		component: ModalComponents.StoryCreate,
	},
];

export default function Core({
	children,
	pageProps,
}: React.PropsWithChildren<{ pageProps: any }>) {
	const [queryClient] = React.useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<ThemeProvider theme={theme}>
					<AlertProvider template={Template} {...alertOptions}>
						<Modal.Provider modals={Modals}>
							{children}
						</Modal.Provider>
					</AlertProvider>
				</ThemeProvider>
			</Hydrate>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
