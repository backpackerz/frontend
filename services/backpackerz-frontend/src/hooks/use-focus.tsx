import React from "react";

export default function useFocus() {
	const htmlElRef = React.useRef<HTMLElement>(null);

	const setFocus = () => {
		htmlElRef.current && htmlElRef.current.focus();
	};

	return [htmlElRef, setFocus];
}
