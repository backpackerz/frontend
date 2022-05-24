import { useEffect, useCallback, useRef } from "react";

export default function useOutsideClick<T extends HTMLElement>(
	onClick: (event: MouseEvent) => void,
) {
	const ref = useRef<T>(null);

	const handleClick = useCallback(
		(event: MouseEvent) => {
			if (!ref.current) return;

			const inside = ref.current.contains(event.target as HTMLElement);

			if (inside) return;

			onClick(event);
		},
		[onClick, ref],
	);

	useEffect(() => {
		document.addEventListener("click", handleClick);

		return () => document.removeEventListener("click", handleClick);
	}, [handleClick]);

	return ref;
}
