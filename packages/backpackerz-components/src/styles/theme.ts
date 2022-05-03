import { palette } from "./palette";

export type ButtonColorTypes = keyof typeof buttonColorMap;

export const buttonColorMap = {
	teal: {
		background: palette.teal6,
		color: "white",
		hoverBackground: palette.teal5,
	},
	lightGray: {
		background: palette.gray2,
		color: palette.gray7,
		hoverBackground: palette.gray1,
	},
	gray: {
		background: palette.gray6,
		color: "white",
		hoverBackground: palette.gray5,
	},
	darkGray: {
		background: palette.gray8,
		color: "white",
		hoverBackground: palette.gray6,
	},
	transparent: {
		background: "none",
		color: palette.teal6,
		hoverBackground: palette.teal1,
	},
	red: {
		background: palette.red5,
		color: "white",
		hoverBackground: palette.red4,
	},
	green: {
		background: palette.green5,
		color: "white",
		hoverBackground: palette.green4,
	},
};
export const buttonTheme = (color: ButtonColorTypes) => `
	background-color: ${buttonColorMap[color].background};
	color: ${buttonColorMap[color].color};
	&:hover, &:focus {
		background-color: ${buttonColorMap[color].hoverBackground};
	},
`;
export const inputTheme = () => `
	box-shadow: 0 1px 2px 0 rgb(35 57 66 / 21%);
	&:hover, &:focus {
		box-shadow: 0 1px 2px 0 rgb(35 57 66 / 42%);
		transition: box-shadow 0.2s;
	}
	&::placeholder {
		color: ${palette.gray5};
		font-weight: 600;
	}
`;

export const theme = {
	palette,
	buttonColorMap,
};
