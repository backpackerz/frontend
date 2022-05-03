import React, { useRef } from "react";
import {
	Transition as AlertTransition,
	TransitionStatus,
} from "react-transition-group";
import { TRANSITIONS } from "./constants";

type transitionKeys = typeof TRANSITIONS[keyof typeof TRANSITIONS];

type TransitionProps = {
	children: React.ReactNode;
	type: transitionKeys;
};

const duration = 250;

const defaultStyle = {
	[TRANSITIONS.FADE]: {
		transition: `opacity ${duration}ms ease`,
		opacity: 0,
	},
	[TRANSITIONS.SCALE]: {
		transform: "scale(1)",
		transition: `all ${duration}ms ease-in-out`,
	},
} as {
	[key in transitionKeys]: React.CSSProperties;
};
const transitionStyles = {
	[TRANSITIONS.FADE]: {
		entering: { opacity: 0 },
		entered: { opacity: 1 },
	},
	[TRANSITIONS.SCALE]: {
		entering: { transform: "scale(0)" },
		entered: { transform: "scale(1)" },
		exiting: { transform: "scale(0)" },
		exited: { transform: "scale(1)" },
	},
} as {
	[key in transitionKeys]: {
		[key in TransitionStatus]: React.CSSProperties;
	};
};
export default function Transition(props: TransitionProps) {
	const { children, type, ...rest } = props;
	const ref = useRef(null);

	return (
		<AlertTransition nodeRef={ref} {...rest} timeout={duration}>
			{(state) => (
				<div
					ref={ref}
					style={{
						...defaultStyle[type],
						...transitionStyles?.[type]?.[state],
					}}
				>
					{children}
				</div>
			)}
		</AlertTransition>
	);
}
