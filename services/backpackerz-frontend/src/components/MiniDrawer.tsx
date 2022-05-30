import * as React from "react";
import { Theme, CSSObject } from "@mui/material/styles";
import {
	styled,
	useTheme,
	Drawer as BaseDrawer,
	DrawerProps,
	Icon,
	IconButton,
	Divider,
} from "@backpackerz/components";

export type Props = React.PropsWithChildren<
	DrawerProps & {
		drawerOpenWidth: number;
		drawerCloseWidth: number;
	}
>;

const openedMixin = (width: number, theme: Theme): CSSObject => ({
	width: width,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (width: number, theme: Theme): CSSObject => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: width,
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
}));

const Drawer = styled(BaseDrawer, {
	shouldForwardProp: (prop: string) =>
		!["open", "drawerOpenWidth", "drawerCloseWidth"].includes(prop),
})<Props>(({ theme, open, drawerOpenWidth, drawerCloseWidth }) => ({
	width: drawerOpenWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(drawerOpenWidth, theme),
		"& .MuiDrawer-paper": openedMixin(drawerOpenWidth, theme),
	}),
	...(!open && {
		...closedMixin(drawerCloseWidth, theme),
		"& .MuiDrawer-paper": closedMixin(drawerCloseWidth, theme),
	}),
}));

export default function MiniDrawer(props: Props) {
	const { children, drawerOpenWidth, drawerCloseWidth } = props;
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => setOpen(true);

	const handleDrawerClose = () => setOpen(false);

	const ToggleButton = React.useCallback(
		() => (
			<IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
				{theme.direction === "rtl" && open && <Icon.ChevronRight />}
				{theme.direction === "rtl" && !open && <Icon.ChevronLeft />}
				{theme.direction === "ltr" && open && <Icon.ChevronLeft />}
				{theme.direction === "ltr" && !open && <Icon.ChevronRight />}
			</IconButton>
		),
		[open, theme.direction],
	);
	return (
		<Drawer
			variant="permanent"
			open={open}
			drawerOpenWidth={drawerOpenWidth}
			drawerCloseWidth={drawerCloseWidth}
		>
			<DrawerHeader>
				<ToggleButton />
			</DrawerHeader>
			<Divider />
			{children}
		</Drawer>
	);
}
