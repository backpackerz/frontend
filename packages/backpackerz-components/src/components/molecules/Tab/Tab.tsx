import * as React from "react";

import Button, { Props as ButtonProps } from "../../../components/atoms/Button";

export type Props = ButtonProps & {
	value: number;
	selected?: boolean;
	onChange?: (value: any) => unknown;
};

export default function Tab(props: Props) {
	const { children, value, selected, onChange, ...rest } = props;
	const onClick = () => onChange && onChange(value);
	return (
		<Button
			id={`tab-${value}`}
			aria-selected={selected}
			aria-controls={`tabpanel-${value}`}
			onClick={onClick}
			{...rest}
		>
			{children}
		</Button>
	);
}
