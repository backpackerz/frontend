import * as React from "react";
import MiniDrawer, { Props } from "components/MiniDrawer";
import { actions, useDispatch, useSelector } from "modules";

export default function EditDrawer(props: Props) {
	const map = useSelector((state) => state.app.map.data);
	const dispatch = useDispatch();

	const handleRemoveMarker = (marker: google.maps.LatLng) => () => {
		dispatch(actions.map.removeMarker(marker));
	};
	const buttons = (
		<div>
			{map.markers.map((marker, i) => (
				<button
					style={{ display: "block" }}
					key={i}
					onClick={handleRemoveMarker(marker)}
				>
					{JSON.stringify(marker)}
				</button>
			))}
		</div>
	);
	return <MiniDrawer {...props}>{buttons}</MiniDrawer>;
}
