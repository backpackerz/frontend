import React, { useEffect, useState, useRef } from "react";

const useHover = (): [React.LegacyRef<HTMLDivElement>, boolean] => {
	const [value, setValue] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const handleMouseOver = () => setValue(true);
	const handleMouseOut = () => setValue(false);
	useEffect(() => {
		const node = ref.current;
		if (node) {
			node.addEventListener("mouseover", handleMouseOver);
			node.addEventListener("mouseout", handleMouseOut);
			return () => {
				node.removeEventListener("mouseover", handleMouseOver);
				node.removeEventListener("mouseout", handleMouseOut);
			};
		}
	}, [ref.current]);
	return [ref, value];
};

export default useHover;
