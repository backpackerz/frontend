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
	const map = useSelector((state) => state.app.map.data);
	const dispatch = useDispatch();

	const { location: currentLocation, error: currentError } =
		useCurrentLocation(getCurrentLocationOptions);

	React.useEffect(() => {
		dispatch(
			actions.map.setCenter({
				lat: currentLocation?.latitude || 0,
				lng: currentLocation?.longitude || 0,
			}),
		);
	}, [currentLocation]);

	const handleIdle = (map: google.maps.Map) => {
		dispatch(actions.map.setZoom(map.getZoom()));
		dispatch(actions.map.setCenter(map.getCenter()?.toJSON()));
	};
	const handleAddMarker = (event: google.maps.MapMouseEvent) => {
		dispatch(actions.map.addMarker(event.latLng?.toJSON()));
	};
	return (
		<div style={{ height: "100%", width: "100%" }}>
			<ConditionallyRender client>
				<Map
					apiKey={process.env.GOOGLE_MAP_API_KEY!}
					defaultZoom={map.zoom}
					defaultCenter={map.center}
					markers={map.markers}
					onClick={handleAddMarker}
					onIdle={handleIdle}
				/>
			</ConditionallyRender>
		</div>
	);
}
