import * as React from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { BPStyle, Alert, Modal } from "@backpackerz/components";
import { modalConfig } from "./Modal/config";

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

export default function Core({
	children,
	pageProps,
}: React.PropsWithChildren<{ pageProps: any }>) {
	const [queryClient] = React.useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<BPStyle.ThemeProvider>
					<AlertProvider template={Template} {...alertOptions}>
						<Modal.Provider modals={modalConfig}>
							{children}
						</Modal.Provider>
					</AlertProvider>
				</BPStyle.ThemeProvider>
			</Hydrate>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
