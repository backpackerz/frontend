export const numberToWordMap = {
	1: "one",
	2: "two",
	3: "three",
	4: "four",
	5: "five",
	6: "six",
	7: "seven",
	8: "eight",
	9: "nine",
	10: "ten",
	11: "eleven",
	12: "twelve",
	13: "thirteen",
	14: "fourteen",
	15: "fifteen",
	16: "sixteen",
};

export type numberToWordMapKeyType = keyof typeof numberToWordMap;

export function numberToWord(value: numberToWordMapKeyType) {
	const type = typeof value;
	if (type === "string" || type === "number") {
		return numberToWordMap[value] || value;
	}

	return "";
}

export const useWidthProp = (val: numberToWordMapKeyType, prefixClass = "") => {
	const valType = typeof val;
	if ((valType === "string" || valType === "number") && prefixClass) {
		return `${prefixClass}-${numberToWord(val)}`;
	}
	return numberToWord(val);
};

export const useKeyOnly = (val: string | boolean, key: string) => val && key;
