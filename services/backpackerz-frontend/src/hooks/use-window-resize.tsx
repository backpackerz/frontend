import * as React from "react";

export default function useWindowResize(
	effect: (window: Window, event: UIEvent) => unknown,
) {
	function functionDebounce(this: Window, event: UIEvent) {
		let lastAnimationFrame: number | undefined = undefined;
		if (!window || !window.requestAnimationFrame) {
			// IE10+
			effect(this.window, event);
			return;
		}
		if (window.cancelAnimationFrame && lastAnimationFrame) {
			window.cancelAnimationFrame(lastAnimationFrame);
		}
		lastAnimationFrame = window.requestAnimationFrame(() =>
			effect(window, event),
		);
	}
	React.useEffect(() => {
		if (window) {
			window.addEventListener("resize", functionDebounce);
			return () => {
				window.removeEventListener("resize", functionDebounce);
			};
		}
	});
}
