import React from "react";
import { styled } from "@mui/material";
import { debounce } from "lodash";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import type { Map } from "@backpackerz/components/types";

type Props = {
	className?: string;
	map?: google.maps.Map;
	service: Map.Service;
};

export default React.memo(function MapHeader(props: Props) {
	const { map, service } = props;
	const [query, setQuery] = React.useState("");
	const [result, setResult] = React.useState<
		google.maps.places.PlaceResult[]
	>([]);

	React.useEffect(
		debounce(() => {
			fetchPlaceFromQuery(query)
				.then((result) => setResult(result))
				.catch(() => setResult([]));
		}, 1000),
		[query],
	);

	const getOptionLabel = (
		option: google.maps.places.PlaceResult | string,
	) => {
		if (typeof option == "string") return option;
		return option.name || "";
	};

	const handleInputChanged = (event: React.SyntheticEvent, value: string) => {
		setQuery(value);
	};

	const handleOptionClicked = (
		event: React.SyntheticEvent,
		value: string | google.maps.places.PlaceResult | null,
	) => {
		if (typeof value !== "string" && value?.geometry?.location) {
			map?.setZoom(14);
			map?.setCenter(value.geometry.location);
		}
	};

	const fetchPlaceFromQuery = (
		query: string,
	): Promise<google.maps.places.PlaceResult[]> => {
		if (!query) return Promise.resolve([]);
		if (!service.placesService) Promise.resolve([]);

		return new Promise((resolve, reject) => {
			service!.placesService!.findPlaceFromQuery(
				{
					fields: ["ALL"],
					query,
				},
				(results, status) => {
					if (status == google.maps.places.PlacesServiceStatus.OK) {
						resolve(results || []);
					}
					reject(status);
				},
			);
		});
	};

	return (
		<div {...props}>
			<Stack spacing={2} sx={{ width: 300 }}>
				<Autocomplete
					freeSolo
					options={result}
					getOptionLabel={getOptionLabel}
					onChange={handleOptionClicked}
					onInputChange={handleInputChanged}
					renderInput={(params) => (
						<TextField
							{...params}
							label="장소 검색"
							value={query}
						/>
					)}
				/>
			</Stack>
		</div>
	);
});
