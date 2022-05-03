import * as React from "react";

export default function useActiveElement() {
	const [listenersReady, setListenersReady] = React.useState(false);
	const [activeElement, setActiveElement] = React.useState(
		document.activeElement,
	);

	React.useEffect(() => {
		const onFocus = (event: FocusEvent) =>
			event.target && setActiveElement(event.target as Element);
		const onBlur = (event: FocusEvent) => setActiveElement(null);

		window.addEventListener("focus", onFocus, true);
		window.addEventListener("blur", onBlur, true);

		setListenersReady(true);

		return () => {
			window.removeEventListener("focus", onFocus);
			window.removeEventListener("blur", onBlur);
		};
	}, []);

	return {
		activeElement,
		listenersReady,
	};
}
