import * as React from "react";

import Icon from "../../../atoms/Icons";
import type { Alert } from "@backpackerz/components/types";

export type Props = {
	message: string;
	options: Alert.Options;
	style?: React.CSSProperties;
	close: () => void;
};

const alertStyle = {
	backgroundColor: "#151515",
	color: "white",
	padding: "10px",
	textTransform: "uppercase",
	borderRadius: "3px",
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	boxShadow: "0px 2px 2px 2px rgba(0, 0, 0, 0.03)",
	fontFamily: "Arial",
	width: "300px",
	boxSizing: "border-box",
} as React.CSSProperties;

const buttonStyle = {
	marginLeft: "20px",
	border: "none",
	backgroundColor: "transparent",
	cursor: "pointer",
	color: "#FFFFFF",
};

export default function AlertTemplate(props: Props) {
	const { message, options, style, close } = props;
	return (
		<div style={{ ...alertStyle, ...style }}>
			{options.type === "info" && <Icon.Info />}
			{options.type === "success" && <Icon.Success />}
			{options.type === "error" && <Icon.Error />}
			<span style={{ flex: 2 }}>{message}</span>
			<button onClick={close} style={buttonStyle}>
				<Icon.Close />
			</button>
		</div>
	);
}
