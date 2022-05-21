import * as React from "react";
import { Theme, CSSObject } from "@mui/material/styles";
import {
	styled,
	useTheme,
	Drawer,
	DrawerProps,
	Icon,
	IconButton,
	Divider,
} from "@backpackerz/components";

const drawerOpenWidth = 240;
const drawerCloseWidth = 80;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerOpenWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: drawerCloseWidth,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const MiniDrawer = styled(Drawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerOpenWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

export type Props = React.PropsWithChildren<DrawerProps>;

export default function EditDrawer(props: Props) {
	const { children } = props;
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

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
		<MiniDrawer variant="permanent" open={open}>
			<DrawerHeader>
				<ToggleButton />
			</DrawerHeader>
			<Divider />
			{children}
		</MiniDrawer>
	);
}
