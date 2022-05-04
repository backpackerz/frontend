import * as React from "react";

export type Props = React.ComponentPropsWithoutRef<"div"> & {
	children?: React.ReactNode;
	index: number;
	value: number;
};

export default function TabPanel(props: Props) {
	const { children, value, index, ...rest } = props;
	return (
		<div
			id={`tabpanel-${index}`}
			role="tabpanel"
			hidden={value !== index}
			aria-labelledby={`tab-${index}`}
			tabIndex={0}
			{...rest}
		>
			{value === index && <div>{children}</div>}
		</div>
	);
}
