import {
	createSlice,
	PayloadAction,
	SliceCaseReducers,
} from "@reduxjs/toolkit";

type Center = {
	lat: number;
	lng: number;
};

type Marker = google.maps.LatLng;

export type InitialState = {
	data: {
		zoom: number;
		center: Center;
		markers: Marker[];
	};
};

export const initialState: InitialState = {
	data: {
		zoom: 15,
		center: {
			lat: 0,
			lng: 0,
		},
		markers: [],
	},
};

const slice = createSlice<InitialState, SliceCaseReducers<InitialState>>({
	name: "itinerary",
	initialState,
	reducers: {
		setZoom(state, { payload }: PayloadAction<number>) {
			state.data.zoom = payload;
		},
		setCenter(state, { payload }: PayloadAction<Center>) {
			state.data.center = payload;
		},
		addMarker(state, { payload }: PayloadAction<Marker>) {
			state.data.markers = [...state.data.markers, payload];
		},
		removeMarker(state, { payload }: PayloadAction<Marker>) {
			state.data.markers = state.data.markers.filter(
				(marker) => JSON.stringify(marker) != JSON.stringify(payload),
			);
		},
	},
	extraReducers: (builder) => {},
});

export const reducer = slice.reducer;

export const state = slice.getInitialState();

export const actions = slice.actions;
