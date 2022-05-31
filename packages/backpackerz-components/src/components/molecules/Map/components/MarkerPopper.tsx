import * as React from "react";

export type Props = google.maps.InfoWindowOptions & {
	marker?: google.maps.Marker;
};

export default function MarkerPopper(props: Props) {
	const { marker, ...options } = props;

	const [infoWindow, setInfoWindow] =
		React.useState<google.maps.InfoWindow>();

	React.useEffect(() => {
		if (!infoWindow) {
			setInfoWindow(new google.maps.InfoWindow());
		}
		return () => {
			if (infoWindow) {
			}
		};
	}, [infoWindow]);

	React.useEffect(() => {
		if (!infoWindow) return;
		infoWindow.setOptions(options);
		return () => {};
	}, [infoWindow, options]);

	React.useEffect(() => {
		if (!infoWindow) return;
		if (!marker) return;
		const listener = google.maps.event.addListener(
			marker,
			"click",
			handleClick,
		);
		return () => {
			google.maps.event.removeListener(listener);
		};
	}, [infoWindow, marker]);

	const handleClick = (event: google.maps.LatLng) => {
		if (!infoWindow) return;
		infoWindow.open({
			anchor: marker,
		});
	};

	return null;
}
