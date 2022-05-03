import * as React from "react";

export type Props = React.PropsWithChildren<{
	client?: boolean;
	server?: boolean;
}>;

export default function ConditionallyRender(props: Props) {
	const [isMounted, setIsMounted] = React.useState(false);

	React.useEffect(() => setIsMounted(true), []);

	if (!isMounted && props.client) {
		return null;
	}

	if (isMounted && props.server) {
		return null;
	}

	return props.children as React.ReactElement;
}
