import * as React from "react";
import MuiDrawer, { DrawerProps } from "@mui/material/Drawer";
import Box from "@mui/material/Box";

export type Props = React.PropsWithChildren<DrawerProps>;

export default function Drawer(props: Props) {
	const { children, ...drawerProps } = props;
	return (
		<MuiDrawer {...drawerProps}>
			<Box role="presentation">{children}</Box>
		</MuiDrawer>
	);
}
