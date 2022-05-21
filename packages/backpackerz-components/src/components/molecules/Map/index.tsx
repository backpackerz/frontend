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

	const markerComponents = React.useMemo(
		() => markers.map((latLng, i) => <Marker key={i} position={latLng} />),
		[markers],
	);

	const render = (status: Status) => {
		return <h1>{status}</h1>;
	};

	return (
		<Wrapper apiKey={apiKey} libraries={USE_LIBRARIES} render={render}>
			<Map
				onIdle={onIdle}
				onClick={onClick}
				options={options}
				markers={markerComponents}
			/>
		</Wrapper>
	);
}
