import * as React from "react";

import { Map, useCurrentLocation } from "@backpackerz/components";
import ConditionallyRender from "components/ConditionallyRender";
import { useSelector, useDispatch, actions } from "modules";

const getCurrentLocationOptions = {
	enableHighAccuracy: true,
	timeout: 1000 * 60 * 1,
	maximumAge: 1000 * 3600 * 24,
};

export default function EditMap() {
	const { zoom, center, markers } = useSelector(
		(state) => state.app.itinerary.data,
	);
	const dispatch = useDispatch();
	const { location: currentLocation, error: currentError } =
		useCurrentLocation(getCurrentLocationOptions);

	React.useEffect(() => {
		dispatch(
			actions.itinerary.setCenter({
				lat: currentLocation?.latitude || 0,
				lng: currentLocation?.longitude || 0,
			}),
		);
	}, [currentLocation]);

	const handleIdle = (map: google.maps.Map) => {
		dispatch(actions.itinerary.setZoom(map.getZoom()));
		dispatch(actions.itinerary.setCenter(map.getCenter()));
	};
	const handleAddMarker = (event: google.maps.MapMouseEvent) => {
		dispatch(actions.itinerary.addMarker(event.latLng?.toJSON()));
	};
	return (
		<div style={{ height: "100%", width: "100%" }}>
			<ConditionallyRender client>
				<Map
					apiKey={process.env.GOOGLE_MAP_API_KEY!}
					defaultZoom={zoom}
					defaultCenter={center}
					markers={markers}
					onClick={handleAddMarker}
					onIdle={handleIdle}
				/>
			</ConditionallyRender>
		</div>
	);
}
