import { useState, useEffect } from "react";

export default function useCurrentLocation(options: PositionOptions = {}) {
	const [location, setLocation] =
		useState<Pick<GeolocationCoordinates, "latitude" | "longitude">>();
	const [error, setError] = useState<string>();

	const handleSuccess = (pos: GeolocationPosition) => {
		const { latitude, longitude } = pos.coords;
		setLocation({
			latitude,
			longitude,
		});
	};

	const handleError = (error: GeolocationPositionError) => {
		setError(error.message);
	};

	useEffect(() => {
		const { geolocation } = navigator;

		if (!geolocation) {
			setError("Geolocation is not supported.");
			return;
		}
		geolocation.getCurrentPosition(handleSuccess, handleError, options);
	}, [options]);

	return { location, error };
}
