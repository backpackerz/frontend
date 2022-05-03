import * as React from "react";
import { POSITIONS } from "./constants";

export type Props = {
	children: React.ReactNode;
	options: {
		position: keyof typeof POSITIONS;
		containerStyle: React.CSSProperties;
	};
};

export const getWrapperStyles = (position: keyof typeof POSITIONS) => {
	const initialStyles = {
		left: 0,
		position: "fixed",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		width: "100%",
		pointerEvents: "none",
	} as React.CSSProperties;

	switch (position) {
		case POSITIONS.TOP_LEFT:
			return {
				...initialStyles,
				top: 0,
				alignItems: "flex-start",
			};
		case POSITIONS.TOP_CENTER:
			return {
				...initialStyles,
				top: 0,
			};
		case POSITIONS.TOP_RIGHT:
			return {
				...initialStyles,
				top: 0,
				alignItems: "flex-end",
			};
		case POSITIONS.MIDDLE_LEFT:
			return {
				...initialStyles,
				top: "50%",
				alignItems: "flex-start",
			};
		case POSITIONS.MIDDLE: {
			return {
				...initialStyles,
				top: "50%",
			};
		}
		case POSITIONS.MIDDLE_RIGHT:
			return {
				...initialStyles,
				top: "50%",
				alignItems: "flex-end",
			};

		case POSITIONS.BOTTOM_LEFT:
			return {
				...initialStyles,
				bottom: 0,
				alignItems: "flex-start",
			};
		case POSITIONS.BOTTOM_CENTER:
			return {
				...initialStyles,
				bottom: 0,
			};
		case POSITIONS.BOTTOM_RIGHT:
			return {
				...initialStyles,
				bottom: 0,
				alignItems: "flex-end",
			};

		default: {
			return initialStyles;
		}
	}
};

export default function Wrapper(props: Props) {
	const {
		children,
		options: { position, containerStyle },
		...rest
	} = props;
	const styles = React.useMemo(() => getWrapperStyles(position), [position]);

	return (
		React.Children.count(children) > 0 && (
			<div style={{ ...styles, ...containerStyle }} {...rest}>
				{children}
			</div>
		)
	);
}
