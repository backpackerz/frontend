import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProviderProps } from "@mui/material/styles/ThemeProvider";
import {
	ThemeProvider as MuiThemeProvider,
	Theme,
	createTheme,
} from "@mui/material/styles";

export const palette = {
	/* grey */
	grey0: "#ffffff",
	grey1: "#f5f5f5",
	grey2: "#ebebeb",
	grey3: "#e0e0e0",
	grey4: "#d6d6d6",
	grey5: "#cccccc",
	grey6: "#c2c2c2",
	grey7: "#b8b8b8",
	grey8: "#adadad",
	grey9: "#a3a3a3",
	grey10: "#999999",
	grey11: "#8f8f8f",
	grey12: "#858585",
	grey13: "#7a7a7a",
	grey14: "#707070",
	grey15: "#666666",
	grey16: "#5c5c5c",
	grey17: "#525252",
	grey18: "#474747",
	grey19: "#3d3d3d",
	grey20: "#333333",
	grey21: "#292929",
	grey22: "#1f1f1f",
	grey23: "#141414",
	grey24: "#0A0A0A",
	grey25: "#000000",
	/* darkGreen */
	darkGreen0: "#CAD39C",
	darkGreen1: "#C3CD8E",
	darkGreen2: "#BBC77F",
	darkGreen3: "#B4C171",
	darkGreen4: "#ACBB63",
	darkGreen5: "#A4B455",
	darkGreen6: "#9AAA4B",
	darkGreen7: "#8D9C44",
	darkGreen8: "#818E3E",
	darkGreen9: "#748038",
	darkGreen10: "#677132",
	darkGreen11: "#5a632c",
	darkGreen12: "#4d5525",
	darkGreen13: "#40471f",
	darkGreen14: "#333919",
	darkGreen15: "#272B13",
	/* lightGreen */
	lightGreen0: "#78F7CF",
	lightGreen1: "#65F6C8",
	lightGreen2: "#51F5C1",
	lightGreen3: "#3EF4BA",
	lightGreen4: "#2BF3B3",
	lightGreen5: "#18F2AD",
	lightGreen6: "#0DE7A2",
	lightGreen7: "#0CD495",
	lightGreen8: "#0BC187",
	lightGreen9: "#0AAE7A",
	lightGreen10: "#099A6C",
	lightGreen11: "#08875F",
	lightGreen12: "#077351",
	lightGreen13: "#066043",
	lightGreen14: "#054C36",
	lightGreen15: "#043A29",
	/* red */
	red0: "#E78888",
	red1: "#E37878",
	red2: "#E06767",
	red3: "#DC5656",
	red4: "#D94545",
	red5: "#D53434",
	red6: "#CB2A2A",
	red7: "#BA2626",
	red8: "#A92323",
	red9: "#981F1F",
	red10: "#871C1C",
};

export const defaultTheme = {
	direction: "ltr",
	zIndex: {
		mobileStepper: 10,
		speedDial: 10,
		appBar: 10,
		drawer: 10,
		modal: 10,
		snackbar: 10,
		tooltip: 10,
		fab: 10,
	},
	palette: {
		mode: "light",
		primary: {
			main: palette.grey7,
			light: palette.grey5,
			dark: palette.grey9,
			contrastText: palette.grey9,
		},
		secondary: {
			main: palette.lightGreen7,
			light: palette.lightGreen5,
			dark: palette.lightGreen9,
			contrastText: palette.lightGreen9,
		},
		error: {
			main: palette.red8,
			light: palette.red5,
			dark: palette.red10,
			contrastText: palette.lightGreen9,
		},
		warning: {
			main: palette.grey7,
			light: palette.lightGreen5,
			dark: palette.lightGreen9,
			contrastText: palette.lightGreen9,
		},
		info: {
			main: palette.grey7,
			light: palette.lightGreen5,
			dark: palette.lightGreen9,
			contrastText: palette.lightGreen9,
		},
		success: {
			main: palette.grey7,
			light: palette.lightGreen5,
			dark: palette.lightGreen9,
			contrastText: palette.lightGreen9,
		},
		common: {
			white: palette.grey0,
			black: palette.grey25,
		},
		grey: {
			50: palette.grey1,
			100: palette.grey3,
			200: palette.grey5,
			300: palette.grey7,
			400: palette.grey9,
			500: palette.grey11,
			600: palette.grey13,
			700: palette.grey15,
			800: palette.grey17,
			900: palette.grey19,
			A100: palette.grey21,
			A200: palette.grey23,
			A400: palette.grey24,
			A700: palette.grey25,
		},
	},
} as Theme;

type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export function ThemeProvider(
	props: MakeOptional<ThemeProviderProps, "theme">,
) {
	const { children, theme = {} } = props;

	return (
		<MuiThemeProvider theme={createTheme(defaultTheme, theme)}>
			<CssBaseline />
			{children}
		</MuiThemeProvider>
	);
}
