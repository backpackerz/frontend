import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import {
	ThemeProvider as MuiThemeProvider,
	ThemeOptions,
	createTheme,
} from "@mui/material/styles";

export const palette = {
	/* teal */
	teal0: "#F3FFFB",
	teal1: "#C3FAE8",
	teal2: "#96F2D7",
	teal3: "#63E6BE",
	teal4: "#38D9A9",
	teal5: "#20C997",
	teal6: "#12B886",
	teal7: "#0CA678",
	teal8: "#099268",
	teal9: "#087F5B",
	/* gray */
	gray0: "#F8F9FA",
	gray1: "#F1F3F5",
	gray2: "#E9ECEF",
	gray3: "#DEE2E6",
	gray4: "#CED4DA",
	gray5: "#ADB5BD",
	gray6: "#868E96",
	gray7: "#495057",
	gray8: "#343A40",
	gray9: "#212529",
	gray10: "#000000",
	/* red */
	red0: "#fff5f5",
	red1: "#ffe3e3",
	red2: "#ffc9c9",
	red3: "#ffa8a8",
	red4: "#ff8787",
	red5: "#ff6b6b",
	red6: "#fa5252",
	red7: "#f03e3e",
	red8: "#e03131",
	red9: "#c92a2a",
	/* green */
	green0: "#CAD959",
	green1: "#bfcc5c",
	green2: "#B4BF5E",
	green3: "#8b9846",
	green4: "#64732F",
	green5: "#4b5924",
	green6: "#34401A",
	green7: "#303719",
	green8: "#2b2e18",
	green9: "#252617",
};

export const theme = createTheme({
	zIndex: {
		mobileStepper: 1,
		speedDial: 1,
		appBar: 1,
		drawer: 1,
		modal: 1,
		snackbar: 1,
		tooltip: 1,
		fab: 1,
	},
	palette: {
		mode: "light",
		primary: {
			main: palette.gray7,
			light: palette.gray5,
			dark: palette.gray9,
			contrastText: palette.gray9,
		},
		secondary: {
			main: palette.teal7,
			light: palette.teal5,
			dark: palette.teal9,
			contrastText: palette.teal9,
		},
		error: {
			main: palette.gray7,
		},
		warning: {
			main: palette.gray7,
		},
		info: {
			main: palette.gray7,
		},
		success: {
			main: palette.gray7,
		},
		common: {
			black: palette.gray0,
			white: palette.gray10,
		},
		grey: {
			50: palette.gray0,
			100: palette.gray1,
			200: palette.gray2,
			300: palette.gray3,
			400: palette.gray4,
			500: palette.gray5,
			600: palette.gray6,
			700: palette.gray7,
			800: palette.gray8,
			900: palette.gray9,
			A100: palette.gray10,
			A200: palette.gray10,
			A400: palette.gray10,
			A700: palette.gray10,
		},
	},
});

type Props = {
	themeOptions?: ThemeOptions;
};

export function ThemeProvider(props: React.PropsWithChildren<Props>) {
	const { children, themeOptions = {} } = props;

	return (
		<MuiThemeProvider theme={createTheme(theme, themeOptions)}>
			<CssBaseline />
			{children}
		</MuiThemeProvider>
	);
}
