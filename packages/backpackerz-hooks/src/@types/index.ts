type oneToNine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type yy = 1 | 2 | 3 | 4 | 0;
type d = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0;

type YYYY = `20${yy}${d}`;
type MM = `0${oneToNine}` | `1${0 | 1 | 2}`;
type DD = `${0}${oneToNine}` | `${1 | 2}${d}` | `3${0 | 1}`;

type DateYMString = `${YYYY}-${MM}`;

export type DateYMDString = `${DateYMString}-${DD}`;

export type stateProps = {
	from: {
		default?: DateYMDString;
		defaultToday?: boolean;
		min?: DateYMDString;
		minToday?: boolean;
	};
	to: {
		default?: DateYMDString;
		defaultDistanceFrom?: number;
		max?: DateYMDString;
	};
};

export type UseDateRangeState = ({ from, to }?: stateProps) => [
	DateYMDString,
	DateYMDString,
	(date: string) => void,
	(date: string) => void,
	{
		min: DateYMDString;
		max: DateYMDString;
	},
];
