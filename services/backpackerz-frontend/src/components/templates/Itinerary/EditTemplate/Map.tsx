import * as React from "react";

import {
	Map as MapComponent,
	useCurrentLocation,
} from "@backpackerz/components";
import ConditionallyRender from "components/ConditionallyRender";

export default function Map() {
	const { location: currentLocation, error: currentError } =
		useCurrentLocation({
			enableHighAccuracy: true,
			timeout: 1000 * 60 * 1,
			maximumAge: 1000 * 3600 * 24,
		});
	const [center, setCenter] = React.useState({
		lat: 0,
		lng: 0,
	});
	const [markers, setMarkers] = React.useState<google.maps.LatLng[]>([]);

	React.useEffect(() => {
		setCenter({
			lat: currentLocation?.latitude || 0,
			lng: currentLocation?.longitude || 0,
		});
	}, [currentLocation]);

	const onClick = (event: google.maps.MapMouseEvent) => {
		setMarkers([...markers, event.latLng!]);
	};
	return (
		<div style={{ height: "100%", width: "100%" }}>
			<ConditionallyRender client>
				{markers.map((marker) => (
					<button
						onClick={() =>
							setMarkers(markers.filter((m) => m != marker))
						}
					>
						{JSON.stringify(marker)}
					</button>
				))}
				<MapComponent
					apiKey={process.env.GOOGLE_MAP_API_KEY!}
					defaultZoom={15}
					defaultCenter={center}
					markers={markers}
					onClick={onClick}
				/>
			</ConditionallyRender>
		</div>
	);
}
