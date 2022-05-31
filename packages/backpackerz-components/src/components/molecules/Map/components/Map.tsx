import * as React from "react";
import { styled } from "@mui/material";

import useGoogleMap from "../hooks/use-google-map";
import MapHeader from "../components/MapHeader";
import { Props as MarkerProps } from "./Marker";
import MarkerPopper from "./MarkerPopper";

type Props = React.PropsWithChildren<{
	className?: string;
	style?: React.CSSProperties;
	options?: google.maps.MapOptions;
	markerComponents?: React.ReactElement<MarkerProps>[];
	onIdle?: (map: google.maps.Map) => unknown;
	onClick?: (event: google.maps.MapMouseEvent) => unknown;
}>;

export default function Map(props: Props) {
	const {
		className,
		style,
		options = {},
		markerComponents,
		children,
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

	const bindMarkers = React.useMemo(
		() =>
			map &&
			React.Children.map(markerComponents, (child) => {
				if (React.isValidElement(child)) {
					return React.cloneElement(child, {
						map,
						title: "title",
						popper: <MarkerPopper />,
					});
				}
			}),
		[map, markerComponents],
	);

	return (
		<Wrapper className={className} style={style}>
			<Header map={map} service={service} />
			<View ref={ref} />
			{bindMarkers}
		</Wrapper>
	);
}
const Header = styled(MapHeader)`
	position: absolute;
	top: 0;
	z-index: 1;
`;
const View = styled("div")`
	flex-grow: 1;
`;
const Wrapper = styled("div")`
	position: relative;
	display: flex;
	height: 100%;
`;
