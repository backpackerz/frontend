import React from "react";

import { createCustomEqual } from "fast-equals";

const isLatLngLiteral = (obj: any) =>
	obj != null &&
	typeof obj === "object" &&
	Number.isFinite(obj.lat) &&
	Number.isFinite(obj.lng);

const deepCompareEqualsForMaps = createCustomEqual(
	(deepEqual) => (a: any, b: any) => {
		if (!window.google) return deepEqual(a, b);
		if (
			isLatLngLiteral(a) ||
			a instanceof window.google.maps.LatLng ||
			isLatLngLiteral(b) ||
			b instanceof window.google.maps.LatLng
		) {
			return new window.google.maps.LatLng(a).equals(
				new window.google.maps.LatLng(b),
			);
		}

		return deepEqual(a, b);
	},
);

function useDeepCompareMemoize(value: any) {
	const ref = React.useRef();

	if (!deepCompareEqualsForMaps(value, ref.current)) {
		ref.current = value;
	}

	return ref.current;
}

export default function useDeepCompareEffectForMaps(
	callback: React.EffectCallback,
	dependencies: React.DependencyList,
) {
	React.useEffect(callback, dependencies.map(useDeepCompareMemoize));

	return null;
}
