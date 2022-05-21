import React from "react";

import useDeepCompareEffectForMaps from "../hooks/use-deep-compare-effect";
import type { Map } from "@backpackerz/components/types";

export default function useGoogleMap(
	options: google.maps.MapOptions,
): [React.RefObject<HTMLDivElement>, google.maps.Map | undefined, Map.Service] {
	const ref = React.useRef<HTMLDivElement>(null);
	const [map, setMap] = React.useState<google.maps.Map>();
	const [placesService, setPlacesService] =
		React.useState<google.maps.places.PlacesService>();
	const service = { placesService };

	useDeepCompareEffectForMaps(() => {
		if (map) {
			map.setOptions(options);
		}
	}, [map, options]);

	React.useEffect(() => {
		if (ref.current && !map) {
			setMap(new window.google.maps.Map(ref.current, {}));
		}
		if (map && !placesService) {
			setPlacesService(new window.google.maps.places.PlacesService(map));
		}
	}, [ref.current, map, placesService]);

	return [ref, map, service];
}
