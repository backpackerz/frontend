import * as React from "react";
import { styled } from "@mui/material";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Libraries } from "@googlemaps/js-api-loader";

import Map from "./components/Map";
import Marker from "./components/Marker";
// import * as tsGuard from "@googlemaps/typescript-guards";

type Props = {
	apiKey: string;
	markers?: google.maps.LatLng[];
	defaultZoom?: number;
	defaultCenter?: google.maps.LatLngLiteral;
	onIdle?: (event: google.maps.Map) => unknown;
	onClick?: (event: google.maps.MapMouseEvent) => unknown;
};

const USE_VERSION = "3.49";
const USE_LIBRARIES: Libraries = ["places"];

export default function GoogleMap(props: Props) {
	const {
		apiKey,
		markers = [],
		defaultZoom,
		defaultCenter = {
			lat: 0,
			lng: 0,
		},
		onIdle,
		onClick,
	} = props;

	const options: google.maps.MapOptions = {
		disableDefaultUI: true,
		center: defaultCenter,
		zoom: defaultZoom,
	};
	const render = (status: Status) => {
		return <h1>{status}</h1>;
	};
	const markerComponents = React.useMemo(
		() => markers.map((latLng, i) => <Marker key={i} position={latLng} />),
		[markers],
	);
	return (
		<Wrapper
			version={USE_VERSION}
			libraries={USE_LIBRARIES}
			apiKey={apiKey}
			render={render}
		>
			<Map
				onIdle={onIdle}
				onClick={onClick}
				options={options}
				markerComponents={markerComponents}
			/>
		</Wrapper>
	);
}
