import * as React from "react";

const changedArray = (
	prevArray: Array<unknown> = [],
	nextArray: Array<unknown> = [],
) =>
	prevArray.length !== nextArray.length ||
	prevArray.some((item, index) => !Object.is(item, nextArray[index]));

type Props = {
	onReset?: () => void;
	onError?: (error: Error, info: { componentStack: string }) => void;
	resetKeys?: Array<unknown>;
	fallbackRender?: React.ComponentType<{ resetErrorBoundary: () => void }>;
};
type State = { error: Error | null };

const initialState: State = { error: null };

export default class ErrorBoundary extends React.Component<
	React.PropsWithRef<React.PropsWithChildren<Props>>,
	State
> {
	state = initialState;
	static getDerivedStateFromError(error: Error) {
		return { error };
	}
	resetErrorBoundary = () => {
		this.reset();
	};

	reset() {
		this.setState(initialState);
		this.props.onReset?.();
	}
	componentDidCatch(error: Error, errorInfo: any) {
		this.props.onError?.(error, errorInfo);
	}
	componentDidUpdate(prevProps: Props, prevState: State) {
		const { error } = this.state;
		const { resetKeys } = this.props;

		if (
			error !== null &&
			prevState.error !== null &&
			changedArray(prevProps.resetKeys, resetKeys)
		) {
			this.reset();
		}
	}
	render() {
		const { fallbackRender, children } = this.props;
		const { error } = this.state;

		if (error !== null) {
			if (React.isValidElement(fallbackRender)) {
				return fallbackRender;
			}
		}
		return children;
	}
}
