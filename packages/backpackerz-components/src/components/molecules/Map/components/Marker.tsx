import * as React from "react";

export type Props = google.maps.MarkerOptions & {
	popper?: React.ReactChild;
	onClick?: (event: google.maps.MapMouseEvent) => unknown;
};

export default function Marker(props: Props) {
	const { popper, onClick, ...options } = props;

	const [marker, setMarker] = React.useState<google.maps.Marker>();

	React.useEffect(() => {
		if (!marker) {
			setMarker(new google.maps.Marker());
		}
		return () => {
			if (marker) {
				marker.setMap(null);
			}
		};
	}, [marker]);

	React.useEffect(() => {
		if (marker) {
			marker.setOptions(options);
		}
		return () => {};
	}, [marker, options]);

	React.useEffect(() => {
		if (marker) {
			["click"].forEach((eventName) => {
				// google.maps.event.clearListeners(marker, eventName);
			});
			if (onClick) {
				google.maps.event.addListener(marker, "click", onClick);
			}
			google.maps.event.addListener(marker, "click", handleClick);
		}
	}, [marker, onClick]);

	const handleClick = (event: google.maps.LatLng) => {};

	const bindMarkerPoppers = React.useMemo(() => {
		if (!popper) return;
		if (!React.isValidElement(popper)) return;

		return React.cloneElement(popper, { marker });
	}, [popper, options]);

	return <>{bindMarkerPoppers}</>;
}
