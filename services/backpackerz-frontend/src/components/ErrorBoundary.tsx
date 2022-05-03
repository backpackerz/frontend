import * as React from "react";

export default class ErrorBoundary extends React.Component<
	React.PropsWithChildren<{}>
> {
	state = {
		hasError: false,
	};
	static getDerivedStateFromError(error: Error) {
		return { hasError: true };
	}
	componentDidCatch(error: Error, errorInfo: any) {}

	render() {
		return <>{this.props.children}</>;
	}
}
