import React, { useRef, useEffect, useState } from "react";
import styled from "@emotion/styled";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
	"pk.eyJ1IjoiazA2MDMxNTYiLCJhIjoiY2tieGUyZjdqMG90OTM0bXgwcWtuOHNibSJ9.4JlTbIlFErwYEKqBw1W7tQ";

export default function App() {
	const mapContainer = useRef<HTMLDivElement>(null);
	const map = useRef<mapboxgl.Map>();
	const [lng, setLng] = useState(-70.9);
	const [lat, setLat] = useState(42.35);
	const [zoom, setZoom] = useState(9);

	useEffect(() => {
		if (map.current) return;
		if (mapContainer.current)
			map.current = new mapboxgl.Map({
				container: mapContainer.current,
				style: "mapbox://styles/mapbox/streets-v11",
				center: [lng, lat],
				zoom: zoom,
			});
	});

	useEffect(() => {
		if (!map.current) return; // wait for map to initialize
		map.current.on("move", () => {
			if (!map.current) return;

			const center = map.current.getCenter();

			setLng(parseInt(center.lng.toFixed(4)));
			setLat(parseInt(center.lat.toFixed(4)));
			setZoom(parseInt(map.current.getZoom().toFixed(2)));
		});
	});

	return (
		<MapboxBlock>
			<Sidebar>
				Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
			</Sidebar>
			<MapBoxContainer ref={mapContainer} />
		</MapboxBlock>
	);
}

const Sidebar = styled.div`
	background-color: rgba(35, 55, 75, 0.9);
	color: #fff;
	padding: 6px 12px;
	font-family: monospace;
	z-index: 1;
	position: absolute;
	top: 0;
	left: 0;
	margin: 12px;
	border-radius: 4px;
`;

const MapBoxContainer = styled.div`
	height: 800px;
`;
const MapboxBlock = styled.div`
	position: relative;
`;
