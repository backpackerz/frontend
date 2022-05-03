import { DateYMDString } from "../../@types";

export const getDistanceDate = (date: Date | DateYMDString, argv: number) => {
	const distanceDate = new Date(
		new Date(date).valueOf() + 1000 * 3600 * 24 * argv,
	);
	return distanceDate;
};

export const checkRange = (
	date: Date | string,
	[from, to]: [from: Date, to: Date],
) => {
	const d = new Date(date);
	const dt = d.getTime();
	const ft = from.getTime();
	const tt = to.getTime();

	if (dt >= ft || dt <= tt) {
		return d;
	} else throw RangeError("invalid date");
};

export const format = (date: Date | DateYMDString) => {
	const seoul = 3240 * 10000;
	return new Date(+new Date(date) + seoul)
		.toISOString()
		.replace("T", " ")
		.replace(/\..*/, "")
		.split(" ")[0];
};
