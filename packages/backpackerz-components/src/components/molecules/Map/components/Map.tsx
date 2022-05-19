import * as React from "react";
import { styled } from "@mui/material";

import useGoogleMap from "../hooks/use-google-map";
import Header from "../components/Header";

type Props = React.PropsWithChildren<{
	className?: string;
	style?: React.CSSProperties;
	options?: google.maps.MapOptions;
	markers?: React.ReactChild[];
	onIdle?: (map: google.maps.Map) => unknown;
	onClick?: (event: google.maps.MapMouseEvent) => unknown;
}>;

export default function Map(props: Props) {
	const {
		className,
		style,
		children,
		options = {},
		markers,
		onIdle,
		onClick,
	} = props;

	const [ref, map, service] = useGoogleMap(options);

	React.useEffect(() => {
		if (map) {
			["click", "idle"].forEach((eventName) =>
				google.maps.event.clearListeners(map, eventName),
			);
			map.addListener("idle", () => {});
			if (onClick) {
				map.addListener("click", onClick);
			}

			if (onIdle) {
				map.addListener("idle", () => onIdle(map));
			}
		}
	}, [map, onClick, onIdle]);

	const renderMarkers = React.useMemo(
		() =>
			map &&
			React.Children.map(markers, (child) => {
				if (React.isValidElement(child)) {
					return React.cloneElement(child, { map });
				}
			}),
		[map, markers],
	);

	return (
		<Wrapper className={className} style={style}>
			<MapHeader map={map} service={service} />
			<MapView ref={ref} />
			{renderMarkers}
		</Wrapper>
	);
}
const MapHeader = styled(Header)`
	position: absolute;
	top: 0;
	z-index: 1;
`;
const MapView = styled("div")`
	flex-grow: 1;
`;
const Wrapper = styled("div")`
	position: relative;
	display: flex;
	height: 100%;
`;
