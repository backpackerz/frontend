import * as React from "react";
import Box from "@mui/material/Box";
import MuiDrawer, { DrawerProps } from "@mui/material/Drawer";

export default function Drawer(props: React.PropsWithChildren<DrawerProps>) {
	const { children } = props;
	return (
		<MuiDrawer anchor={"left"} open={true}>
			<Box role="presentation">{children}</Box>
		</MuiDrawer>
	);
}
