import { ENUMS } from "@backpackerz/core";

export const STATE_OPTIONS = [
	{
		value: ENUMS.ItineraryState.Before,
		label: "여행 전",
	},
	{
		value: ENUMS.ItineraryState.During,
		label: "여행 중",
	},
	{
		value: ENUMS.ItineraryState.After,
		label: "여행 후",
	},
];

export const PERSONNEL_OPTIONS = [
	{
		value: 1,
		label: "1명",
	},
	{
		value: 2,
		label: "2명",
	},
	{
		value: 3,
		label: "3명",
	},
];
