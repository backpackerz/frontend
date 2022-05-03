import * as React from "react";
import { format, getDistanceDate, checkRange } from "./utils";
import { DateYMDString, UseDateRangeState } from "../../@types";

// function checkVaildDate(date: string | number) {
// 	const d = new Date(date);
// 	return (
// 		Object.prototype.toString.call(d) === "[object Date]" &&
// 		d.getTime &&
// 		!isNaN(d.getTime())
// 	);
// }

const useDateRangeState: UseDateRangeState = (
	{ from, to } = {
		from: {
			defaultToday: true,
			min: "2022-01-12",
		},
		to: {
			defaultDistanceFrom: 1,
		},
	},
) => {
	const min: DateYMDString =
		from.min ||
		(from.minToday ? (format(new Date()) as DateYMDString) : "2000-01-01");
	const minDate = new Date(min);
	const max: DateYMDString = to.max || "2039-12-31";
	const maxDate = new Date(max);

	const [fromDate, setFromDate] = React.useState<DateYMDString>(() => {
		if (!(from.default && from.defaultToday) || from.defaultToday)
			return format(
				checkRange(new Date(), [minDate, maxDate]),
			) as DateYMDString;
		return from.default;
	});
	const [toDate, setToDate] = React.useState<DateYMDString>(() => {
		if (!(to.default && to.defaultDistanceFrom) || to.defaultDistanceFrom) {
			return format(
				checkRange(
					getDistanceDate(new Date(), to.defaultDistanceFrom || 1),
					[minDate, maxDate],
				),
			) as DateYMDString;
		}
		return to.default;
	});

	React.useEffect(() => {
		if (new Date(fromDate).getTime() > new Date(toDate).getTime()) {
			setToDate(
				format(
					checkRange(fromDate, [minDate, maxDate]),
				) as DateYMDString,
			);
		}
	}, [fromDate]);
	const handleSetFromDate = (date: string) => {
		setFromDate(
			format(checkRange(date, [minDate, maxDate])) as DateYMDString,
		);
	};
	const handleSetToDate = (date: string) => {
		setToDate(
			format(checkRange(date, [minDate, maxDate])) as DateYMDString,
		);
	};
	return [
		fromDate,
		toDate,
		handleSetFromDate,
		handleSetToDate,
		{
			min,
			max,
		},
	];
};

export default useDateRangeState;
