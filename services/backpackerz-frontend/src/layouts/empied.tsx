import React from "react";

type Props = {
	children?: React.ReactNode;
};

export default function EmptiedLayout(props: Props) {
	const { children } = props;
	return <main>{children}</main>;
}
